import {Fragment, useState, useEffect, useContext} from 'react';
import Login from './Login'
import styled from 'styled-components';
import {UserContext} from '../context/userProvider'
import {useOutletContext} from "react-router-dom";
import CartItem from '../components/CartItem';
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";

const StyledMain = styled.main`
  padding: 20px;
  90vh;
  display: flex;
`
const StyledOrderSummary = styled.article`
    padding: 20px;
    margin: 10px;
    height: 100%;
    width: 50%;
    margin-bottom: 10px;
    position: relative;
    box-shadow: var(--shadow);

    h3 {
      font-size: clamp(1rem, 1.8vw, 1.1rem)
    }
`

const CardContainer = styled.div`
  padding: 20px;
  margin: 10px;
  display: grid;
  width: 50%;
  box-shadow: var(--shadow);

  article {
    zoom: .7;
  }
`

const Cart = () => {
  const { user, setUser } = useContext(UserContext);
  const { orders, cartOrder } = useOutletContext();
  const [totalPrice, setTotalPrice] = useState(0);

  // Update average review when reviews change
  useEffect(() => {
    if (cartOrder && cartOrder.cartItems.length > 0) {
      const totalPrice = cartOrder.cartItems.reduce((sum, item) => sum + (item.cookie.price * item.numCookies), 0);
      setTotalPrice(totalPrice.toFixed(2));
    }
  }, [cartOrder]);

  if (!user) return <Login />

  if (!cartOrder) {
    return <h1>Loading Cart...</h1>
  }

  if (cartOrder.cartItems.length===0) {
    return (
      <StyledMain>
        <h1>Your Cart is Empty</h1>
      </StyledMain>
    );
  }

  return (
      <StyledMain>
        <CardContainer>
          <h2>Shopping Cart</h2>         
          {cartOrder.cartItems.map(cartItem=>
            <Fragment key={cartItem.id}>
              <CartItem
                  {...cartItem}
                  isFinal={true}
              />
              <hr />
            </Fragment>
          )}
        </CardContainer>
        <StyledOrderSummary>
          <h3>Subtotal ({2}) Items: <strong>${totalPrice}</strong></h3>
          <p>Order ID: {cartOrder.id}</p>
          <hr />
          <NavLink
            to="/checkout"
            className="nav-link"
          >
            <Button variant="warning">Proceed to Checkout</Button>            
          </NavLink>
        </StyledOrderSummary>
      </StyledMain>
    );
  };
  
  export default Cart;
  