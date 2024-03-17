import { Box,Text } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <>
      <Box px={10} py={10}>
        <Box>
          <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: '3xl' }}fontWeight="lightbold">
            Expense Summary: 
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: '3xl' }}fontWeight="lightbold">
            Total Expenses:
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: '3xl' }}fontWeight="lightbold">
            Top Categories: Food, Transportation, Fullstack, Travel
          </Text>
          
        </Box>
        <Box mt={20}>
          <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: '3xl' }}fontWeight="lightbold">
            Budget Summary:
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: '3xl' }}fontWeight="lightbold">
            Total Budget: 
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: '3xl' }}fontWeight="lightbold">
            Remaining Budget: 
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
