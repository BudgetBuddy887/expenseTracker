import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import React from 'react';
import { CREATE_BUDGET, UPDATE_BUDGET,DELETE_BUDGET} from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { Container, Row, Col, Table, Button, Modal, Form, Card } from 'react-bootstrap';

const Budget = () => {
  const [createBudget] = useMutation(CREATE_BUDGET, {
    refetchQueries: [QUERY_ME, 'me'],
  });

  const [updateBudget] = useMutation(UPDATE_BUDGET, {
    refetchQueries: [QUERY_ME, 'me'],
  });

  const [deleteBudget] = useMutation(DELETE_BUDGET, {
    refetchQueries: [QUERY_ME, 'me'],
  });

  const { loading, error, data } = useQuery(QUERY_ME);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleBudgetSubmit = async (e) => {
    e.preventDefault();
    try {
      const budgetInput = {
        description,
        amount: Number.parseFloat(amount),
        category,
      };
      if (isEdit) {
        await updateBudget({
          variables: {
            budgetData: { ...budgetInput, id: selectedBudget._id },
          },
        });
      } else {
        await createBudget({
          variables: {
            budgetData: budgetInput,
          },
        });
      }
      closeModal();
    } catch (e) {
      console.error('Error occurred while saving budget:', e);
    }
  };

  const openEditModal = (budget) => {
    setIsEdit(true);
    setSelectedBudget(budget);
    setDescription(budget.description);
    setCategory(budget.category);
    setAmount(budget.amount.toString());
    setShowModal(true);
  };

  const openAddModal = () => {
    setIsEdit(false);
    setSelectedBudget(null);
    setDescription('');
    setCategory('');
    setAmount('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDeleteBudget = async (budgetId) => {
    try {
      await deleteBudget({
        variables: {
          budgetId,
        },
      });
    } catch (e) {
      console.error('Error occurred while deleting budget:', e);
    }
  };

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <Card>
            <Card.Header className="bg-secondary text-black">
              <h4 className="mb-0" >My Budget</h4>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <Button variant="primary" onClick={openAddModal}>
                    Add Budget
                  </Button>
                </Col>
              </Row>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="4" className="text-center text-danger">
                        {error.message}
                      </td>
                    </tr>
                  ) : data && data.me && data.me.budgets ? (
                    data.me.budgets.map((budget) => (
                      <tr key={budget._id}>
                        <td>{budget.description}</td>
                        <td>{budget.category}</td>
                        <td>£{budget.amount.toFixed(2)}</td>
                        <td>
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => openEditModal(budget)}
                            className="me-2"
                          >
                            ✎ 
                          </Button>
                          <Button
                            variant='danger'
                            size="sm"
                            onClick={() => handleDeleteBudget(budget._id)}
                          >
                            🗑️
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No budgets found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Edit Budget' : 'Add New Budget'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleBudgetSubmit}>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              {isEdit ? 'Update' : 'Save'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Budget;