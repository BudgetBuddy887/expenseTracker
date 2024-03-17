import { Text,Box,Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
const Expenses = () => {
    return(
        <Box px={10} py={10}>
        <Box>
          <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: '3xl' }} fontWeight="lightbold">
            Add Expenses: <Button as={Link} to='/expenseform' ml={10} colorScheme="green">Add Expenses</Button>
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: '3xl' }} fontWeight="lightbold">
            Title:
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: '3xl' }} fontWeight="lightbold">
            Amount
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: '3xl' }} fontWeight="lightbold">
            Date
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: '3xl' }} fontWeight="lightbold">
            Category
          </Text>
        </Box>
        <Box mt={20}>
          <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: '3xl' }} fontWeight="lightbold">
            Expense List:
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: '3xl' }} fontWeight="lightbold">
            -Training xx pounds: <Button as={Link} to='/expenseform' ml={10} colorScheme="green">Edit</Button> <Button ml={2} colorScheme="red">Del</Button>
          </Text>
        </Box>
      </Box>
    )
}

export default Expenses