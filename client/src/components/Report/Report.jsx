import { useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button, 
    ButtonGroup, 
    Box, 
    Stack, 
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader, 
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Text,
    GridItem,
    Grid,
    Divider

  } from '@chakra-ui/react'
import ExpenseForm from './ExpenseForm';


const ExpenseList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [formState, setFormState] = useState({ amount:0, description:'', category: '', vendor: '', date:''});

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
  
    return (
        <>
          <Stack direction='column'>
            <Box>
              <Grid templateColumns='repeat(1, 1fr)' gap={6}>
                <GridItem w='100%' h='10' textAlign='center' fontSize='3xl'  >Expense View</GridItem>
              </Grid>
              <br></br>
              <Divider></Divider>
              <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                <GridItem w='100%' h='10'  >Total Expense</GridItem>
                <GridItem w='100%' h='10'  >Daily Average</GridItem>
                <GridItem w='100%' h='10'  >Budget</GridItem>
                <GridItem w='100%' h='10' ><Button onClick={onOpen} colorScheme='teal' textAlign='left'>Add Expense </Button></GridItem>
                {/* <GridItem w='100%' h='10' bg='blue.500' />
                <GridItem w='100%' h='10' bg='blue.500' />
                <GridItem w='100%' h='10' bg='blue.500' /> */}
              </Grid>
              
              {/* <ExpenseForm></ExpenseForm> */}
              <Modal isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleFormSubmit}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Add New Expense</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Input
                          placeholder="Enter transaction description"
                          name="description"
                          type="text"
                          onChange={handleFormChange}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Category</FormLabel>
                        <Input
                          placeholder="i.e. Household, Electricity, Water, Entertainment"
                          name="category"
                          type="text"
                          onChange={handleFormChange}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Vendor</FormLabel>
                        <Input
                          placeholder="i.e. Sainsbury, Tesco, Amazon"
                          name="location"
                          type="text"
                          onChange={handleFormChange}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Expense Date</FormLabel>
                        <Input
                          placeholder="Enter transaction Date"
                          name="date"
                          type="date"
                          onChange={handleFormChange}
                        />
                      </FormControl>
                      <FormControl mt={"15px"}>
                        <FormLabel>Enter Amount</FormLabel>
                        <Input
                          placeholder="Enter transaction amount"
                          name="amount"
                          type="number"
                          onChange={handleFormChange}
                        />
                      </FormControl>
    
                    </ModalBody>
                    <ModalFooter>
                      <Button mr={"4"} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button onClick={onClose} type="submit">Add</Button>
                    </ModalFooter>
                  </ModalContent>
                </form>
              </Modal>
              </Box>
            <Box >
              <TableContainer>
                <Table  size='sm'>
                  <TableCaption>Expense Vs Budget View</TableCaption>
                  <Thead>
                    <Tr>       
                      <Th>Description</Th>
                      <Th>Category</Th>
                      <Th>Location</Th>
                      <Th >Date</Th>
                      <Th isNumeric>Amount</Th> 
                      <Th></Th>       
                      <Th></Th> 
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.expenses.map((e, index) => {
                      return (
                        <Tr key={e.id}>
                          <Td>{e.description}</Td>                
                          <Td>{e.category}</Td>
                          <Td>{e.location}</Td>
                          <Td>{e.date}</Td>
                          <Td isNumeric>{e.amount}</Td>
                          <Th><Button key={e.id} onClick={editExpense} colorScheme='green' variant='outline'>Edit</Button></Th>
                          <Th><Button key={e.id} colorScheme='red' variant='outline'>Delete</Button></Th>
                        </Tr>
                      );
                    })}
                  </Tbody>    
                </Table>
              </TableContainer>
            </Box>
          </Stack>
        </>
    )
};
export default ExpenseList;
