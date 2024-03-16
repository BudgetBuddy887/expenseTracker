import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

const LoginForm = () => {
  return (
    <Box maxW="md" borderWidth="1px" borderRadius="lg" p={6}>
      <form>
        <Stack spacing={3}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
