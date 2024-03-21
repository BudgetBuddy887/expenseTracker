import { useQuery } from '@apollo/client';
import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE} from '../utils/mutations';
import {QUERY_ME} from '../utils/queries';
import { Bar,Pie } from 'react-chartjs-2';
import {Table, Button, Modal, Container, Card, Row, Col, Form, Badge, Offcanvas, Dropdown, DropdownButton} from 'react-bootstrap';
import {Chart as chartJS,defaults} from "chart.js/auto";



const Expense = () => {
  //const { isOpen, onOpen, onClose } = useDisclosure()
 // refresh the page when updateing the field 
  const [createExpense] = useMutation (CREATE_EXPENSE,{
         refetchQueries: [
        QUERY_ME,
        'me'
      ]

  });
  const [updateExpense] = useMutation (UPDATE_EXPENSE,{
        refetchQueries: [
      QUERY_ME,
      'me'
    ]
});

// refresh the page when updateing the field  
const [deleteExpense] = useMutation (DELETE_EXPENSE,{
  refetchQueries: [
  QUERY_ME,
  'me'
]
});

const [orderBy, setOrderBy] = useState('latest');

const { loading, error, data, refetch } = useQuery(QUERY_ME, {variables: {orderBy}});



// this is just checking if we have expenses and budget in the database this is stop the runtime engine to throuw an error 
// it is going to throw undefined instaead
const expenses = data?.me?.expenses || [];
const budgets = data?.me?.budgets || [];

// to calculate the total expenses and bugdet with reduce method 
const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
const totalBudgets = budgets.reduce((sum, budget) => sum + budget.amount, 0);

const categories =  data?.me?.expenses.map(expense => expense.category) || [];
const amounts =  data?.me?.expenses.map(expense => expense.amount) || [];

const mood = (totalExpenses > totalBudgets) ? "danger" : "success";

console.log(categories);
console.log(amounts);

const chartData = {
  labels: categories,
  datasets: [
    {
      label: 'Amount',
      backgroundColor: "#00ffff",
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(75,192,192,0.4)',
      hoverBorderColor: 'rgba(75,192,192,1)',
      data: amounts, // Update with the total amounts for each category
    },
  ],
};

const [showModal, setShowModal] = React.useState(false);

const [userFormData, setUserFormData] = useState({ description:''});
const [id, setId] = useState("");
const [description, setDescription] = useState("");
const [category, setCategory] = useState("");
const [company, setCompany] = useState("");
const [amount, setAmount] = useState("");
const [date, setDate] = useState("");
const [isEdit, setIsEdit] = useState(false);
//const [expenseDataCache, setExpenseDataCache] = useState(undefined);

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setUserFormData({ ...userFormData, [name]: value });
  console.log(name + ' : ' + value);
};

function format (timestamp) {  
  
  const date = new Date(timestamp);
  console.log(timestamp + ' : ' + date);
  if (!(date instanceof Date)) {
    throw new Error('Invalid "date" argument. You must pass a date instance')
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
const handleExpense = async (e) => {
  e.preventDefault();    
  try {
    if(isEdit) {
      const exepenseInput = {
        id: id,
        description: description, 
        company: company, 
        amount: Number.parseFloat(amount), 
        category: category, 
        date: date
      };
        const updatedExpense = await updateExpense({ variables: { 
        expenseData: exepenseInput
      } });
      setIsEdit(false);
      console.log("updated expense: " + updatedExpense);
    }else {
      const exepenseInput = {
        description: description, 
        company: company, 
        amount: Number.parseFloat(amount), 
        category: category, 
        date: date
      };
        const addedExepense = await createExpense({ variables: { 
        expenseData: exepenseInput
      } });
      console.log("added expense" + addedExepense);
    }
    
    setShowModal(false);
    setUserFormData({
      description: ''
    });
    
  } catch (e) {
    console.error("Error occurred while adding expense: " + e);
  }
}

function editExpense(e){
  const id = e.target.getAttribute("controlId");
  setId(id);
  setIsEdit(true);
  setDescription(document.getElementById('description' + id).innerHTML);
  setCategory(document.getElementById('category' + id).innerHTML);
  setCompany(document.getElementById('company' + id).innerHTML);
  setDate(document.getElementById('date' + id).innerHTML);
  setAmount(document.getElementById('amount' + id).innerHTML);
  setShowModal(true);
}

const handleDeleteExpense = async (e) => {
  

  const id = e.target.getAttribute("controlId"); 
  try {
    const deletedExepense = await deleteExpense({ variables: { 
      expenseId: id
    } });
    console.log(deletedExepense);
  } catch (e) {
    console.error("Error occurred while adding expense: " + e);
  }
}

const [selectedItem, setSelectedItem] = useState(null);

const handleSelect = (item) => {
  setSelectedItem(item);
  setOrderBy(item.toLowerCase());
  refetch({ orderBy: item.toLowerCase() });
};

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

return (
    <>
      <Card className="p-2">
        <Card.Header className="bg-secondary text-black">
          <Row>
            <Col xs={12} sm={6} md={3}>
              <h2 className="mb-0">My Expenses</h2> 
            </Col>
            {/* <Col xs={12} sm={6} md={3}>
              <Badge bg={mood} text='black'>
                Expenses <Badge> £ {data && data.me && data.me.dashboard ? data.me.dashboard.sumExpense : 0}</Badge>
              </Badge>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Badge bg="warning" text='black'>
                Budget <Badge> £ {data && data.me && data.me.dashboard ? data.me.dashboard.sumBudget : 0}</Badge>
              </Badge>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Badge bg="warning" text='black'>
              Top Spending <Badge> £ {data && data.me && data.me.dashboard ? data.me.dashboard.maxExpense : 0}</Badge> 
              </Badge>
            </Col>   */}
            <Col xs={12} sm={6} md={3} className="p-1">
                <Button variant="dark" size="sm" onClick={handleShow} >
                  Financial Health Chart
                </Button>
              </Col>
              <Col xs={12} sm={6} md={3}className="p-1" >
                <DropdownButton size="sm"
                  title={selectedItem || 'Order By'}
                  variant="dark"
                  onSelect={handleSelect}
                >
                  <Dropdown.Item eventKey="Latest">Latest</Dropdown.Item>
                  <Dropdown.Item eventKey="Oldest">Oldest</Dropdown.Item>
                  <Dropdown.Item eventKey="Highest">Highest</Dropdown.Item>
                  <Dropdown.Item eventKey="Lowest">Lowest</Dropdown.Item>
                </DropdownButton>
              </Col>
              <Col xs={12} sm={6} md={3} className="p-1">
              <Button size="sm" variant="dark" onClick={() => {
                  setIsEdit(false); 
                  setId("")
                  setDescription("");
                  setCategory("");
                  setCompany("");
                  setDate("");
                  setAmount("");
                  setShowModal(true)}
                  }>
                  Add Expense
                </Button>
              </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Container fuild="md">
            <Row className='p-2'>
              
            </Row>
            <Row>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Company</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {loading ? 
                  <tr>
                    <td> "Loading..."</td>
                    <td>{error? error.message : "No Error"}</td>
                  </tr>
                  : 
                  <>
                  {data && data.me && data.me.expenses && data.me.expenses.map((e, index) => {
                        return (
                          <tr key={e.id}>
                            <td id={"description" + e._id}>{e.description}</td>                
                            <td id={"category" + e._id}>{e.category}</td>
                            <td id={"company" + e._id}>{e.company}</td>
                            <td id={"date" + e._id}>{e.date}</td>
                            <td id={"amount" + e._id}>£{e.amount}</td>
                          
                            <td className="me-2">
                              <Button size="sm" controlId={e._id} onClick={editExpense} variant='success'>✎</Button>
                              <span>  </span>
                              <Button size="sm" controlId={e._id} onClick={handleDeleteExpense} variant='danger'> 🗑️</Button>
                            </td>
                          </tr>
                        );
                      })}
                  </>}
                </tbody>
              </Table>
            </Row>
            <Modal
            size='lg'
            show={showModal}
            onHide={() => setShowModal(false)}
            aria-labelledby='signup-modal'>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  {isEdit ? 'Edit Expense' : 'Add New Expense'}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row className="mb-3">
                  <Form.Group as={Col} >
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                    type='text'
                    name='description'
                    placeholder='Description'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" 
                    placeholder="i.e. Household, Electricity, Water"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCompany">
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" 
                    placeholder="i.e. Tesco, Sainsbury, Amazon" 
                    onChange={(e) => setCompany(e.target.value)}
                    value={company}/>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridAmount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" 
                    placeholder="Amount" 
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}/>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" 
                    placeholder="Enter date" 
                    onChange={(e) => setDate(e.target.value)}
                    value={date}/>
                  </Form.Group>
                </Row>

              </Modal.Body>
              <Modal.Footer>
                <Button  onClick={handleExpense} variant='success'>Save</Button>
              </Modal.Footer>
            </Modal>
          </Container> 

          <Offcanvas placement={'end'} show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Financial Health Chart</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
              <Badge className="me-2" bg="warning" text='black'>
                Budget <Badge> £ {data && data.me && data.me.dashboard ? data.me.dashboard.sumBudget : 0}</Badge>
              </Badge>
              <Badge className="me-2"  bg={mood} text='black'>
                Expenses <Badge> £ {data && data.me && data.me.dashboard ? data.me.dashboard.sumExpense : 0}</Badge>
              </Badge>
              
              <Badge bg="warning" text='black'>
              Top Spending <Badge> £ {data && data.me && data.me.dashboard ? data.me.dashboard.maxExpense : 0}</Badge> 
              </Badge>
                <Bar
                  data={chartData}
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: 'Category vs Amount',
                      },
                    },
                  }}
                />

              <Bar
                data={{
                  labels: ['March'],
                  datasets: [
                    {
                      label: 'Expenses',
                      data: [totalExpenses],
                      backgroundColor: 'red',
                    },
                    {
                      label: 'Budget',
                      data: [totalBudgets],
                      backgroundColor: 'blue)',
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: 'Budget vs Expenses',
                    },
                  },
          
                }}
              />
              </Offcanvas.Body>
          </Offcanvas>
        </Card.Body>  
      </Card>
    </>
  )
};


export default Expense;
