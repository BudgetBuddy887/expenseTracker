import { useQuery } from '@apollo/client';
import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE} from '../utils/mutations';
import {QUERY_ME} from '../utils/queries';
import Chart from 'chart.js/auto'

import {Table, Button, Modal, Container, Row, Col, Form, Tab, Nav, Dropdown, DropdownButton} from 'react-bootstrap';

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

  
  
  ;
  const { loading, error, data } = useQuery(QUERY_ME);

// refresh the page when updateing the field  
  const [deleteExpense] = useMutation (DELETE_EXPENSE,{
        refetchQueries: [
        QUERY_ME,
        'me'
      ]

  });

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

  const handleSorting = async (e) => {
    alert(e.target.getAttribute("id"));
  }

  const createChart = (async function() {
    const userData = useQuery(QUERY_ME);
    console.log(userData);
    const chartData = [
      { category: "Food", count: 120 },
      { category: "Bills", count: 155 },
      { category: "Rent", count: 370 },
      { category: "Travel", count: 58 },
      { category: "Entertainment", count: 115 },
    ];
  
    new Chart(
      document.getElementById('acquisitions'),
      {
        type: 'doughnut',
        data: {
          labels: chartData.map(row => row.category),
          datasets: [
            {
              label: 'Spending this month',
              data: chartData.map(row => row.count)
            }
          ]
        }
      }
    );
  })();
  
    return (
        <>
        <Container>
          <Row>
            <Col>My Expenses</Col>
            {loading ? 
              <>
                <Col>Calculating Total...</Col>
                <Col>Calculating Top Spending...</Col>
              </> 
              : 
              <>
                <Col>Total: {data && data.me && data.me.dashboard ? data.me.dashboard.sumExpense : 0}</Col>
                <Col>Top Spending: {data && data.me && data.me.dashboard ? data.me.dashboard.maxExpense : 0}</Col>
              </>
            }
            <Col>
              <DropdownButton id="dropdown-item-button" title="-- Sort By --">
                <Dropdown.Item as="button" id="latest" onClick={handleSorting}>Latest</Dropdown.Item>
                <Dropdown.Item as="button" id="oldest" onClick={handleSorting}>Oldest</Dropdown.Item>
                <Dropdown.Item as="button" id="highest" onClick={handleSorting}>Highest</Dropdown.Item>
                <Dropdown.Item as="button" id="lowest" onClick={handleSorting}>Lowest</Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col>
              <Button variant="primary" onClick={() => {
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Company</th>
                <th>Date</th>
                <th>Amount</th>
                <th></th>
                <th></th>
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
                       <td id={"amount" + e._id}>{e.amount}</td>
                       <td><Button controlId={e._id} onClick={editExpense} variant='outline-info'>Edit</Button></td>
                       <td><Button controlId={e._id} onClick={handleDeleteExpense} variant='outline-danger'>Delete</Button></td>
                     </tr>
                   );
                 })}
              </>}
   
            </tbody>
          </Table>
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
        <div><canvas id="acquisitions"></canvas></div>        </>
    )
};
export default Expense;
