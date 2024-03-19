import { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { ChakraProvider, Box, Flex, FormControl, FormLabel, Input, Button, FormHelperText, FormErrorIcon, FormErrorMessage } from '@chakra-ui/react';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [addUser, {error}] = useMutation(ADD_USER);

  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log('client validation passed');

    try {
      const { data } = await addUser({
        variables: { ...userFormData }
      });

      console.log('user is created successfully' + JSON.stringify(data));
     

      // const { token, user } = await data.json();
      Auth.login(data.addUser.token);
      console.log(user);
      Auth.login(token);

    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  const isError = userFormData.username === '' || userFormData.email === '' || userFormData.password === '';

  return (
    <>
      <ChakraProvider>
        <Box p={4} mt={20}>
          <Flex justifyContent="center">
            <Box w="320px" p={3} border='1px' borderColor='gray.200' borderRadius='5'>
              <FormControl isInvalid={isError}>
                <FormLabel>Username</FormLabel>
                <Input type="text" placeholder="Enter your username" onChange={handleInputChange} 
                // value={userFormData.username}
                />
                {!isError ? (
                  <FormHelperText>
                    Enter your username
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Username is required.</FormErrorMessage>
                )}

                <FormLabel>Email</FormLabel>
                <Input type="text" placeholder="Enter your email" onChange={handleInputChange} 
                // value={userFormData.email}
                />
                {!isError ? (
                  <FormHelperText>
                    Enter your email
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}

                <FormLabel>Password</FormLabel>
                <Input type="text" placeholder="Choose your password" onChange={handleInputChange} 
                // value={userFormData.password}
                />
                {!isError ? (
                  <FormHelperText>
                    Choose a password
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Password is required.</FormErrorMessage>
                )}
              </FormControl>
              <Button mt={6} colorScheme="green" width="100%" onClick={handleFormSubmit}>
                Signup
              </Button>
            </Box>
          </Flex>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default SignupForm;