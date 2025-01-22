import React, { useState, useContext } from "react";
import {useOutletContext} from "react-router-dom";
import { postJSONToDb } from "../helper";
import styled from "styled-components";
import {UserContext} from '../context/userProvider'

const Button = styled.button` 
`

const Error = styled.button`
`

const Input = styled.input`

`

const FormField = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const Label = styled.label`
`

function LoginForm() {

  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const body = { username, password }

    postJSONToDb("login", body)
    .then(setUser);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormField>
      <FormField>
        <Button variant="fill" color="primary" type="submit">
          Login
        </Button>
      </FormField>
      <FormField>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
    </form>
  );
}

export default LoginForm;