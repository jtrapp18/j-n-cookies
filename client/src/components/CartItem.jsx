import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Tags from "./Tags"
import { getReviewsByCookieId, postJSONToDb } from "../helper";
import Rating from './Rating';

const StyledCartItem = styled.article`
    height: 300px;
    max-width: 90vw;
    padding: 10px;
    margin-bottom: 10px;
    position: relative;
    box-shadow: var(--shadow);
    border-radius: 10px;

    img {
        height: 50%;
        box-shadow: var(--shadow);
        // border-radius: 10px;
    }
`

const CartItem = ({id, name, image, price, isVegan, isGlutenFree, hasNuts, frosting}) => {

    function handleClick() {
        navigate(`/menu/${id}`);
    }

    function removeFromCart() {

        const body = {
            order_id,
            cookie_id: id
        }

        postJSONToDb("cart_items", body);
    }

    return (
        <StyledCartItem
            onClick={handleClick}
        >
            <button onClick={handleClickHeart}>Favorite</button>
            <button onClick={removeFromCart}>Add to Cart</button>

        </StyledCartItem>
    );
}

export default CartItem;
