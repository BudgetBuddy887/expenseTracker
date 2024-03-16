import { useState } from "react";
import { Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

const SignUpForm = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [addUser, {error}] = useMutation(ADD_USER);

  const handleSignUp = async (event) => {
    // Implement signup logic
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log('client validation passed');

    const userName = name;
    const userPwd = password;
    const userEmail = email;

    try {
      const { data } = await addUser({
        variables: { username: userName, password: userPwd, email: userEmail}
      });

      console.log('user is created successfully' + JSON.stringify(data));
     

      // const { token, user } = await data.json();
      Auth.login(data.addUser.token);
      console.log(user);
      Auth.login(token);

    } catch (err) {
      console.error(err);
      //setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
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
