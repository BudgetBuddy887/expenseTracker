import {
    ChakraProvider,
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
  } from "@chakra-ui/react";
  
  const CategoryForm = () => {
    return (
      <ChakraProvider>
        <Box p={4} mt={20} mb={10}>
          <Flex justifyContent="center">
            <Box w="320px" p={3} border='1px' borderColor='gray.200' borderRadius='5'>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type="text" placeholder="Name..." />
              </FormControl>
             
              <Button mt={6} colorScheme="green" width="100%">
                Add Category
              </Button>
            </Box>
          </Flex>
        </Box>
      </ChakraProvider>
    );
  };
  
  export default CategoryForm;
  