import { StyledNavLink } from "../MiscStyling";
import styled from "styled-components";

const LogoContainer = styled.div` 
  text-align: left;
//   height: 100%;

  img {
    height: 100px
  }
`

function Logo() {
  return (
      <LogoContainer>
        <StyledNavLink
          to="/"
          className="home"
        >
          <img src={`images/cookie_line_drawing.png`} alt="home"/>
        </StyledNavLink>
      </LogoContainer>
  );
};

export default Logo;