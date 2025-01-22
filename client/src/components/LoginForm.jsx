import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { postJSONToDb } from "../helper";
import styled from "styled-components";
import { UserContext } from '../context/userProvider';
import { useFormik } from 'formik';

const Button = styled.button`
`;

const Error = styled.button`
`;

const Input = styled.input`
`;

const FormField = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const Label = styled.label`
`;

function LoginForm({ setShowConfirm }) {

  const { setUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: (values) => {
      const body = { username: values.username, password: values.password };

      postJSONToDb("login", body)
        .then(user => {
          if (user) {
            setUser(user);
            setShowConfirm(true);
          }
        });
    },
    validate: (values) => {
      const errors = {};
      if (!values.username) {
        errors.username = 'Username is required';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      }
      return errors;
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Login</h1>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          name="username"
          autoComplete="off"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ? (
          <Error>{formik.errors.username}</Error>
        ) : null}
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <Error>{formik.errors.password}</Error>
        ) : null}
      </FormField>
      <FormField>
        <Button variant="fill" color="primary" type="submit">
          Login
        </Button>
      </FormField>
    </form>
  );
}

export default LoginForm;