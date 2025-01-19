import { StyledNavLink, StyledLink } from "../MiscStyling";

function NavLinks() {

  return (
    <>
      <StyledNavLink
        to="/menu"
        className="nav-link"
      >
          Menu
      </StyledNavLink>
      <StyledNavLink
        to="/account_details"
        className="nav-link"
      >
          Account Details
      </StyledNavLink>
      <StyledNavLink
        to="/cart"
        className="nav-link"
      >
          Cart
      </StyledNavLink>
    </>
  );
};

export default NavLinks;