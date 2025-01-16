import { StyledNavLink, StyledLink } from "../MiscStyling";

function NavLinks({handleClick}) {

  return (
    <>
      <StyledNavLink
        to="/page1"
        className="nav-link"
        onClick={handleClick}
      >
          Page1
      </StyledNavLink>
    </>
  );
};

export default NavLinks;