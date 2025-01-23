import React, { useContext } from "react";
import { postJSONToDb } from '../helper';
import styled from "styled-components";
import { UserContext } from '../context/userProvider';
import { useFormik } from 'formik';

const Button = styled.button``;

const Error = styled.button``;

const Input = styled.input``;

const FormField = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const Label = styled.label``;

function SignUpForm({ setShowConfirm }) {
  const { setUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    onSubmit: (values) => {
      const body = {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
      };

      postJSONToDb("signup", body)
        .then(newUser => {
          if (newUser) {
            postJSONToDb("orders", {userId: newUser.id, purchaseComplete: 0});
            setUser(newUser);
            setShowConfirm(true);
          }
        })
        .catch(error => {
          // Handle errors such as username/email already taken
          if (error.message === 'Username already taken') {
            formik.setFieldError('username', 'Username is already taken');
          }
          if (error.message === 'Email already in use') {
            formik.setFieldError('email', 'Email is already in use');
          }
        });
    },
    validate: (values) => {
      const errors = {};

      // First Name validation
      if (!values.firstName) {
        errors.firstName = 'First Name is required';
      }

      // Username validation
      if (!values.username) {
        errors.username = 'Username is required';
      } else if (values.username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
      }

      // Email validation
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
      }

      // Password validation
      if (!values.password) {
        errors.password = 'Password is required';
      } else {
        if (values.password.length < 8) {
          errors.password = 'Password must be at least 8 characters long';
        }
        if (!/[A-Z]/.test(values.password)) {
          errors.password = 'Password must include at least one uppercase letter';
        }
        if (!/[a-z]/.test(values.password)) {
          errors.password = 'Password must include at least one lowercase letter';
        }
        if (!/\d/.test(values.password)) {
          errors.password = 'Password must include at least one number';
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
          errors.password = 'Password must include at least one special character';
        }
      }

      // Password confirmation validation
      if (values.password !== values.password_confirmation) {
        errors.password_confirmation = 'Passwords must match';
      }

      return errors;
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Sign Up</h1>
      <FormField>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          type="text"
          id="firstName"
          name="firstName"
          autoComplete="off"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <Error>{formik.errors.firstName}</Error>
        ) : null}
      </FormField>
      <FormField>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          type="text"
          id="lastName"
          name="lastName"
          autoComplete="off"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </FormField>
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
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          autoComplete="off"
        />
        {formik.touched.email && formik.errors.email ? (
          <Error>{formik.errors.email}</Error>
        ) : null}
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
        {formik.touched.password && formik.errors.password ? (
          <Error>{formik.errors.password}</Error>
        ) : null}
      </FormField>
      <FormField>
        <Label htmlFor="password_confirmation">Password Confirmation</Label>
        <Input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          value={formik.values.password_confirmation}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
        {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
          <Error>{formik.errors.password_confirmation}</Error>
        ) : null}
      </FormField>
      <FormField>
        <Button type="submit">Sign Up</Button>
      </FormField>
    </form>
  );
}

export default SignUpForm;