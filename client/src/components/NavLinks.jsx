import { useContext } from "react";
import { StyledNavLink } from "../MiscStyling";
import { userLogout } from "../helper";
import {UserContext} from '../context/userProvider'

function NavLinks({handleClick}) {
  const { user, setUser } = useContext(UserContext);

  const handleAccountToggle = () => {
    if (user) {
      userLogout();
      setUser(null);
    }
  }

  return (
    <>
      <StyledNavLink
        to="/menu"
        className="nav-link"
        onClick={handleClick}
      >
          Menu
      </StyledNavLink>
      <StyledNavLink
        to="/account_details"
        className="nav-link"
        onClick={handleClick}
      >
          Account Details
      </StyledNavLink>
      <StyledNavLink
        to="/cart"
        className="nav-link"
        onClick={handleClick}
      >
          Cart
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
    </>
  );
};

export default NavLinks;