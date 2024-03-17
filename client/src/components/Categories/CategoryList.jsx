import { Text, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const CategoryList = () => {
  return (
    <>
      <Box px={10} py={10}>
        <Box>
          <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: '3xl' }} fontWeight="lightbold">
            Add category: <Button as={Link} to='/categoryform' ml={10} colorScheme="green">Add Category</Button>
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: '3xl' }} fontWeight="lightbold">
            Name:
          </Text>
        </Box>
        <Box mt={20}>
          <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: '3xl' }} fontWeight="lightbold">
            Category List:
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: '3xl' }} fontWeight="lightbold">
            Food: <Button as={Link} to='/categoryform' ml={10} colorScheme="green">Edit</Button> <Button ml={2} colorScheme="red">Del</Button>
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default CategoryList;
