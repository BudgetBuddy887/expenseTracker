import React, { useState } from "react";
import AuthService from "../utils/auth";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

const Login = () => {
  const [login] = useMutation(LOGIN_USER);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    // Call AuthService register method to handle user registeration
    try {
      const data = await login({ variables: { email, password } });
      const { token } = data.login;
      AuthService.login(token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
      <button type="submit">Login</button>
    </form>
  );
};
export default SignUp;
