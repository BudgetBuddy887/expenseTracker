import { useState } from "react";
import { Button, Input, FormControl, FormLabel } from "@chakra-ui/react";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    // Implement signup logic
  };

  return (
    <form>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleSignUp}>Sign Up</Button>
    </form>
  );
};

export default SignUpForm;
