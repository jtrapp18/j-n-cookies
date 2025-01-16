import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { StyledNavLink } from "../MiscStyling";
import NavLinks from "./NavLinks";

// Styled components

const StyledDiv = styled.div`
    justify-content: right;
    height: var(--height-header);
    position: relative;
    background: white;
    display: flex;
    align-items: center;
`
const LinkContainer = styled.div`
  position: absolute;
  top: calc(var(--height-header) + 3px);
  // scroll-y: none;
  
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
    height: 16vh;
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

const HamburgerButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: black;
  font-size: clamp(1.5rem, 4vw, 3rem);
  cursor: pointer;
  padding-right: 30px;
  transition: transform 1s ease;

  @media (max-width: 768px) {
    display: block;
  }

  &.open {
    transform: rotate(45deg) translateX(20%);
  }

  .icon {
    display: inline-block;
    transition: transform 0.3s ease; /* Smooth transition for icon scale */

    /* Scale the icon to create a smooth change from ☰ to ✖ */
    &.open {
      transform: scale(1.1) rotate(45deg); /* Scale and rotate for the "X" */
    }
`;

// MobileNavBar Component
const MobileNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cardRef = useRef(null); // Create a reference to the card element

  const handleClickOutside = (e) => {
    if (isMenuOpen && cardRef.current && !cardRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClick = () => {
    setIsMenuOpen(false); // Close menu after navigation
  };

  useEffect(() => {
    // Add event listener to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <StyledDiv
      ref={cardRef}
    >
      <LinkContainer 
        className={isMenuOpen ? "open" : "closed"}
      >
        <StyledNavLink
          to="/"
          className="nav-link"
          onClick={handleClick}
        >
          home
        </StyledNavLink>
        <NavLinks handleClick={handleClick}/>
      </LinkContainer>
      <HamburgerButton 
        className={isMenuOpen ? "open" : ""} 
        onClick={toggleMenu} 
        aria-label="Toggle Menu">
        <span className={`icon ${isMenuOpen ? "open" : ""}`}>
          {isMenuOpen ? "✕" : "☰"}
        </span>
      </HamburgerButton>
    </StyledDiv>
  );
};

export default MobileNavBar;