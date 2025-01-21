import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Tags from "./Tags"
import { getReviewsByCookieId, postJSONToDb } from "../helper";
import Rating from './Rating';
import CookieCard from '../components/CookieCard'
import {useOutletContext} from "react-router-dom";
import { deleteJSONFromDb, patchJSONToDb } from '../helper';

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

function CartItem({ id, cookie, numCookies }) {
    const [newNumCookies, setNewNumCookies] = useState(numCookies);
    const { removeCookieFromCart } = useOutletContext();

    function handleIncrement() {
        const updatedNumCookies = numCookies + 1;
        setNewNumCookies(updatedNumCookies);
        patchJSONToDb("cart_items", id, { numCookies: updatedNumCookies });
    }

    function handleDecrement() {
        if (numCookies > 0) {
            const updatedNumCookies = numCookies - 1;
            setNewNumCookies(updatedNumCookies);
            patchJSONToDb("cart_items", id, { numCookies: updatedNumCookies });
        }
    }

    function handleInputChange(e) {
        const value = Math.max(0, parseInt(e.target.value) || 0); // Ensure no negative values
        setNewNumCookies(value);
        patchJSONToDb("cart_items", id, { numCookies: value });
    }

    function removeFromCart() {
        deleteJSONFromDb("cart_items", id)
        removeCookieFromCart(id);
    }

    return (
        <div className="cart-item">
            <CookieCard {...cookie} />
            <label htmlFor="numCookies">Number of Cookies:</label>
            <div className="input-wrapper">
                <button onClick={handleDecrement} className="decrement-btn">-</button>
                <input
                    type="number"
                    id="numCookies"
                    value={newNumCookies}
                    onChange={handleInputChange}
                    min="0"
                />
                <button onClick={handleIncrement} className="increment-btn">+</button>
            </div>
            <button onClick={() => removeFromCart(id)}>Remove from Cart</button>
        </div>
    );
}

export default CartItem;