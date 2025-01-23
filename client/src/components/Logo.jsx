import { StyledNavLink } from "../MiscStyling";
import styled from "styled-components";

const LogoContainer = styled.div` 
  text-align: left;
  height: 100%;

  img {
    height: 100%;
    padding: 10px;
  }
`

function Logo() {
  return (
      <LogoContainer>
        <StyledNavLink
          to="/"
          className="home"
        >
          <img src={`images/cookie-store-logo.png`} alt="home"/>
        </StyledNavLink>
      </LogoContainer>
  );
};

export default Logo;