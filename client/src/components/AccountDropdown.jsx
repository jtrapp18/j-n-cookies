import styled from "styled-components";
import { useContext, useRef, useEffect } from "react";
import { StyledNavLink } from "../MiscStyling";
import { scrollToTop } from "../helper";
import { UserContext } from '../context/userProvider';

// Styled components

const LinkContainer = styled.div`
  position: absolute;
//   top: calc(var(--height-header) + 3px);
  top: 25px;
  background: white;
  
  left: 0;
  z-index: 1000;
  width: 100%;
  text-decoration: none;
  text-align: right;
  background: white;
  border-bottom: 3px solid var(--green);
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Ensures smooth animation */
  transform-origin: top; /* Animation starts at the top */
  transform: scaleY(0); /* Initially collapsed */
  transition: transform 0.3s ease-in-out; /* Smooth fold-out animation */

  a {
    // border-top: 1px solid var(--light-green);
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(1.5rem, 3vw, 1.75rem);
  }

  &.open {
    transform: scaleY(1); /* Fully expanded */
  }

  &.closed {
    transform: scaleY(0); /* Fully collapsed */
  }

  #exit {
    background: var(--gray);
    span {
      cursor: pointer;
      padding: 5px;
    }
  }
`;

const AccountDropdown = ({isMenuOpen, setIsMenuOpen}) => {
  const { user, setUser } = useContext(UserContext);

  const cardRef = useRef(null);

  const handleAccountToggle = () => {
    if (user) {
      userLogout();
      setUser(null);
      setIsMenuOpen(false);
    }
  }

  const handleClick = () => {
    scrollToTop();
    setIsMenuOpen(false); // Close menu after navigation
  };

  return (
      <LinkContainer 
        ref={cardRef}
        onMouseOver={()=>setIsMenuOpen(true)}
        onMouseOut={()=>setIsMenuOpen(false)}
        className={isMenuOpen ? "open" : "closed"}
      >
        <StyledNavLink
          to="/account_details"
          className="nav-link"
          onClick={handleClick}
        >
          Account Details
        </StyledNavLink>
        <StyledNavLink
          to="/order_history"
          className="nav-link"
          onClick={handleClick}
        >
          Order History
        </StyledNavLink>
        <StyledNavLink
            to="/login"
            className="nav-link"
            onClick={handleAccountToggle}
        >
            {user ? 'Logout' : 'Login'}
        </StyledNavLink>
      </LinkContainer>
  );
};

export default AccountDropdown;