import {
    ChakraProvider,
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
    Select
  } from "@chakra-ui/react";
  
  const BudgetForm = () => {
    return (
      <ChakraProvider>
        <Box p={4} mt={20} mb={10}>
          <Flex justifyContent="center">
            <Box w="320px" p={3} border='1px' borderColor='gray.200' borderRadius='5'>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input type="text" placeholder="Title..." />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Amount</FormLabel>
                <Input type="number" placeholder="Amount..." />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Category</FormLabel>
                <Select>
                  <option value="">cat 1</option>
                  <option value="">cat 2</option>
                  <option value="">cat 3</option>
                </Select>
              </FormControl>
              <Button mt={6} colorScheme="green" width="100%">
                Add Budget
              </Button>
            </Box>
          </Flex>
        </Box>
      </ChakraProvider>
    );
  };
  
  export default BudgetForm;
  