import { NavLink } from "react-router-dom";
import styled, {css} from "styled-components";
import { Link } from "react-scroll";

const StyledMenuItem = css`
  color: black;
  text-decoration: none;
  position: relative;
  padding: 0px 10px 0px 10px;
  cursor: pointer;
`;

const StyledNavigation = css`
  ${StyledMenuItem}

  .tab-name {
    position: relative;
    display: flex;

    span {
      position: relative;
      z-index: 2;
    }
  }

  &.active {
    text-decoration: overline;
    text-decoration-thickness: 2px;

    .backdrop {
      background: var(--striped);;
    }
  }

  &:hover {
    color: var(--green);
  }
`;

const StyledNavLink = styled(NavLink)`
  ${StyledNavigation}
`

const StyledLink = styled(Link)`
  ${StyledNavigation}
`

const StyledMain = styled.main`
  display: flex;
  background: ${(props) => props.theme.background};

  .main-content {
    margin: ${(props) => props.isMobile ? '0 0 20px 0' : '20px'};
  }

  .page-header {
    margin: 10px;
  }
`;

export { StyledMenuItem, StyledNavLink, StyledLink, StyledMain }