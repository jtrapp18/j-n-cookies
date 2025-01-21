import React, {useContext} from 'react';
import NavBar from "./NavBar"
import MobileNavBar from './MobileNavBar';
import {WindowWidthContext} from "../context/windowSize";
import Headroom from 'react-headroom';
import styled from 'styled-components';
import Logo from './Logo';

const StyledHeader = styled(Headroom)`
  padding: 0;
  margin: 0;

  .headroom {
    display: flex;
    justify-content: space-between;
  }
`

const Header = () => {
  const { isMobile } = useContext(WindowWidthContext);
    
    return (
        <StyledHeader>
          <Logo />
          {isMobile ? <MobileNavBar /> : <NavBar />}
        </StyledHeader>
    );
}

export default Header;
