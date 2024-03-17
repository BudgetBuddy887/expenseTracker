import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_EXPENSE } from '../utils/mutations';
import {Table, Button, Modal, Container, Row, Col, Form, Tab, Nav} from 'react-bootstrap';

const ExpenseList = () => {
  //const { isOpen, onOpen, onClose } = useDisclosure()
  const [createExpense] = useMutation (CREATE_EXPENSE);

  const [showModal, setShowModal] = React.useState(false);

  const [userFormData, setUserFormData] = useState({ description:''});

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    console.log(name + ' : ' + value);
  };



  const handleAddExpense = async (e) => {
    e.preventDefault();
    alert(description + ' : ' + category + ' : ' + company + ' : ' + amount + ' : ' + date);
    const exepenseInput = {description: description, company: company, amount: Number.parseFloat(amount), category: category, date: date}
    
    alert(JSON.stringify(exepenseInput));
    
    try {
      const userData = await createExpense({ variables: { 
        expenseData: exepenseInput
      } });
      setShowModal(false);
      console.log(userData);
      setUserFormData({
        description: ''
      });
      
    } catch (e) {
      console.error("Error occurred while adding expense: " + e);
    }
  }

  function editExpense(e){
    alert(e.target.key);
  }

  const data = 
    {
      total: 230,
      average: 20,
      budget: 300,
      expenses: [
        {
          id: '1',
          description: "Grocessary",
          amount: 9.99,
          date: "2024-03-14",
          category: "Expense",
          location: "Tesco"
        },
        {
          id: '2',
          description: "Water bill",
          amount: 49.99,
          date: "2024-03-01",
          category: "Household",
          location: "Scotish Water"
        },
        {
          id: '3',
          description: "Electricity bill ",
          amount: 170.00,
          date: "2024-03-01",
          category: "Household",
          location: "Octopus"
        },
        {
          id: '4',
          description: "TV License",
          amount: 12.99,
          date: "2024-03-01",
          category: "Entertainment",
          location: "BBC"
        },
        {
          id: '5',
          description: "Gym",
          amount: 29.99,
          date: "2024-03-01",
          category: "wellbeing",
          location: "nuffield"
        }
      ]
    }

    function MyVerticallyCenteredModal(props) {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add New Expense
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
                onChange={handleInputChange}
                value={userFormData.description} />
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
                placeholder="Enter email" 
                onChange={(e) => setDate(e.target.value)}
                value={date}/>
              </Form.Group>
            </Row>

          </Modal.Body>
          <Modal.Footer>
            {/* <Button onClick={props.onHide}>Close</Button>
            <Button type="submit" variant="info">Submit</Button>{' '} */}
            <Button  onClick={handleAddExpense} variant='success'>Save</Button>
          </Modal.Footer>
        </Modal>
      );
    }
    
  
    return (
        <>
        <Container>
          <Row>
            <Col>My Expenses</Col>
            <Col>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Expense
              </Button>
              {/* <MyVerticallyCenteredModal
                show={showModal}
                onHide={() => setShowModal(false)}
              /> */}
            </Col>
          </Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Location</th>
                <th>Date</th>
                <th>Amount</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.expenses.map((e, index) => {
                return (
                  <tr key={e.id}>
                    <td>{e.description}</td>                
                    <td>{e.category}</td>
                    <td>{e.location}</td>
                    <td>{e.date}</td>
                    <td >{e.amount}</td>
                    <th><Button key={e.id} onClick={editExpense} variant='outline-info'>Edit</Button></th>
                    <th><Button key={e.id} variant='outline-danger'>Delete</Button></th>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Modal
          size='lg'
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby='signup-modal'>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add New Expense
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
                  placeholder="Enter email" 
                  onChange={(e) => setDate(e.target.value)}
                  value={date}/>
                </Form.Group>
              </Row>

            </Modal.Body>
            <Modal.Footer>
              <Button  onClick={handleAddExpense} variant='success'>Save</Button>
            </Modal.Footer>
          </Modal>
        </Container>
        </>
    )
};
export default ExpenseList;
