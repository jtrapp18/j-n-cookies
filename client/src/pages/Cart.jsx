import {useState, useEffect, useContext} from 'react';
import Login from './Login'
import styled from 'styled-components';
import OrderCard from '../components/OrderCard';
import {getJSON, snakeToCamel} from '../helper'
import {UserContext} from '../context/userProvider'
import {useOutletContext} from "react-router-dom";
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';

const StyledMain = styled.main`
`

const CardContainer = styled.div`
  display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`

const Cart = () => {
  const { user, setUser } = useContext(UserContext);
  const { orders, cartOrder } = useOutletContext();

  if (!user) return <Login />

  if (!cartOrder) {
    return <h1>Loading Cart...</h1>
  }

  if (cartOrder.cartItems.length===0) {
    return (
      <StyledMain>
        <h1>Cart</h1>
        <p>Your cart is currently empty.</p>
      </StyledMain>
    );
  }

  return (
      <StyledMain>
        <h1>Cart</h1>
        <CardContainer>
          <OrderSummary
            {...cartOrder}
          />
          {cartOrder.cartItems.map(cartItem=>
            <CartItem
                key={cartItem.id}
                {...cartItem}
            />
          )}
        </CardContainer>
      </StyledMain>
    );
  };
  
  export default Cart;
  