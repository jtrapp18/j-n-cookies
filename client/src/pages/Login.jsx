import React, {useState} from 'react';
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignUpForm'
import styled from 'styled-components';

const StyledMain = styled.main`
  padding: 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    width: 200px;
    max-width: 90vw;
  }

`

function Login() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <StyledMain>
      
      {!showSignUp &&
        <>
          <LoginForm />
          <p>Don't have an account?</p>
          <button
            onClick={()=>setShowSignUp(true)}
          >
            Sign Up
          </button>
        </>
      }
      {showSignUp &&
        <>
          <SignupForm />
          <p>Already have an account?</p>
          <button
            onClick={()=>setShowSignUp(false)}
          >
            Log In
          </button>
        </>
      }
    </StyledMain>
  );
}

export default Login;