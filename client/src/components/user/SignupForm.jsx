import { ChakraProvider, Box, Flex, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const SignUpForm = () => {
  return (
    <ChakraProvider>
      <Box p={4} mt={20}>
        <Flex justifyContent="center">
          <Box w="320px" p={3} border='1px' borderColor='gray.200' borderRadius='5'>
          <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" placeholder="Enter your name" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" />
            </FormControl>
            <Button mt={6} colorScheme="green" width="100%">
              Signup
            </Button>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default SignUpForm;
