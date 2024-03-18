// import { useQuery } from '@apollo/client';
import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

const Budget = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  const [formState, setFormState] = useState({ amount:0, description:'', category: ''});

  // update state based on form input changes
  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // function handleSubmit(e){
  //   e.preventDefault();
  //   handleFormSubmit(formData);
  // }
  
  function handleFormSubmit(e){
    e.preventDefault();
    alert(formState.amount);
  }

  function editExpense(e){
    alert(e.target.key);
  }

  const data = 
  {
    total: 400,
    budget: [
      {
      description: 'Mobile, TV, Music',
      amount: '100',
      category: 'Entertainment',
      },
      {
      description: 'Train, Bus, Fuel',
      amount: '100',
      category: 'Tavel',
      },
      {
      description: 'Electricity, Water, Council Tax',
      amount: '200',
      category: 'Household',
      }
  
    ]
  }
}