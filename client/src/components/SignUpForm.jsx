import React, { useState, useContext } from "react";
import {useOutletContext} from "react-router-dom";
// import { Button, Error, Input, FormField, Label, Textarea } from "../styles";
import {postJSONToDb} from '../helper'
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

function SignUpForm({ setShowConfirm }) {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);

    const body = {
      username,
      password,
      password_confirmation: passwordConfirmation,
    }

    postJSONToDb("signup", body)
    .then(newUser => {
      if (newUser) {
        setUser(newUser);
        setShowConfirm(true);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password Confirmation</Label>
        <Input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <Button type="submit">Sign Up</Button>
      </FormField>
      <FormField>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
    </form>
  );
}

export default SignUpForm;
