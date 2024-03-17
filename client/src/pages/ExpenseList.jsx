import { useQuery } from '@apollo/client';
import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE} from '../utils/mutations';
import {QUERY_USER_DATA } from '../utils/queries';


import {Table, Button, Modal, Container, Row, Col, Form, Tab, Nav} from 'react-bootstrap';

const ExpenseList = () => {
  //const { isOpen, onOpen, onClose } = useDisclosure()
  const [createExpense] = useMutation (CREATE_EXPENSE);
  const [updateExpense] = useMutation (UPDATE_EXPENSE);
  const {loading, userData} = useQuery (QUERY_USER_DATA);
  const [deleteExpense] = useMutation (DELETE_EXPENSE);
  const [showModal, setShowModal] = React.useState(false);

  const [userFormData, setUserFormData] = useState({ description:''});
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    console.log(name + ' : ' + value);
  };

  const handleExpense = async (e) => {
    e.preventDefault();
    alert(description + ' : ' + category + ' : ' + company + ' : ' + amount + ' : ' + date);

    const exepenseInput = {
      id: id,
      description: description, 
      company: company, 
      amount: Number.parseFloat(amount), 
      category: category, 
      date: date
    }
    
    alert(JSON.stringify(exepenseInput));
    
    try {
      if(isEdit) {
         const updatedExpense = await updateExpense({ variables: { 
          expenseData: exepenseInput
        } });
        setIsEdit(false);
        console.log("updated expense: " + updatedExpense);
      }else {
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
    alert("Deleting expense : " + id);
    
    
    try {
      const deletedExepense = await deleteExpense({ variables: { 
        expenseId: id
      } });
      console.log(deletedExepense);
      
    } catch (e) {
      console.error("Error occurred while adding expense: " + e);
    }

  }

  console.log("is loading data :" + loading);
  console.log(userData);

  const data = 
    {
      total: 230,
      average: 20,
      budget: 300,
      expenses: [
        {
          id: '65f6c70ea45f34c5b59847fe',
          description: "Grocessary",
          amount: 9.99,
          date: "2024-03-14",
          category: "Expense",
          location: "Tesco"
        },
        {
          id: '65f6ef3664e4e7d2a4d7465a',
          description: "Water bill",
          amount: 49.99,
          date: "2024-03-01",
          category: "Household",
          location: "Scotish Water"
        },
        {
          id: '65f7011f0279b46ec489c2af',
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
          id: '65f724bf2ea7969739f5f0e1',
          description: "Mortgage",
          amount: 1900,
          date: "2024-03-01",
          category: "Household",
          location: "HSBC"
        }
      ]
    }

  
    return (
        <>
        <Container>
          <Row>
            <Col>My Expenses</Col>
            <Col>
              <Button variant="primary" onClick={() => {
                setIsEdit(false); 
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
                {data.expenses.map((e, index) => {
                   return (
                     <tr key={e.id}>
                       <td id={"description" + e.id}>{e.description}</td>                
                       <td id={"category" + e.id}>{e.category}</td>
                       <td id={"company" + e.id}>{e.location}</td>
                       <td id={"date" + e.id}>{e.date}</td>
                       <td id={"amount" + e.id}>{e.amount}</td>
                       <td><Button controlId={e.id} onClick={editExpense} variant='outline-info'>Edit</Button></td>
                       <td><Button controlId={e.id} onClick={handleDeleteExpense} variant='outline-danger'>Delete</Button></td>
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
                  placeholder="Enter email" 
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
        </>
    )
};
export default ExpenseList;
