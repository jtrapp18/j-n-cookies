import React, {useState} from 'react';
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignUpForm'
import styled from 'styled-components';

const StyledMain = styled.div`
  .hide {
    display: 'none';
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
            onClick={()=>setShowSignUp(true)}
          >
            Log In
          </button>
        </>
      }
    </StyledMain>
  );
}

export default Login;