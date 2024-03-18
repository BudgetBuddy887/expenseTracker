import React, { useState } from "react";
import AuthService from "../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

const Signup = () => {
  const [signUp] = useMutation(ADD_USER);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    // Call AuthService register method to handle user registration
    try {
      const data = await signUp({ variables: { username, email, password } });
      const { token } = data.addUser;
      AuthService.login(token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        placeholder="UserName"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
