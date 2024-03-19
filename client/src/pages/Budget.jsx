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

export default Budget;