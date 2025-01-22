import { useState, useEffect } from 'react';
import styled from "styled-components";
import CookieCard from '../components/CookieCard';
import { patchJSONToDb, deleteJSONFromDb } from '../helper';
import { useOutletContext } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const StyledCartItem = styled.article`
    margin: 10px;
    max-width: 90vw;
    padding: 10px;
    margin-bottom: 10px;
    position: relative;
    display: flex;
    justify-content: space-between;

    img {
        height: 50%;
        box-shadow: var(--shadow);
    }
`;

function CartItem({ id, cookie, numCookies, isFinal }) {
    const [newNumCookies, setNewNumCookies] = useState(numCookies);
    const { removeCookieFromCart, updateCookieCount } = useOutletContext();
    const [isUpdating, setIsUpdating] = useState(false); // To manage async updates

    useEffect(() => {
        if (isUpdating) {
            // Patch to DB after a delay (debounced effect)
            const timeout = setTimeout(async () => {
                try {
                    await patchJSONToDb("cart_items", id, { numCookies: newNumCookies });
                    updateCookieCount(id, newNumCookies); // Update parent state
                } catch (error) {
                    console.error("Failed to update numCookies:", error);
                } finally {
                    setIsUpdating(false); // Reset updating state
                }
            }, 300); // Debounce duration
            return () => clearTimeout(timeout);
        }
    }, [newNumCookies, id, updateCookieCount, isUpdating]);

    function handleInputChange(e) {
        const value = Math.max(0, parseInt(e.target.value) || 0);
        setNewNumCookies(value);
        setIsUpdating(true);
    }

    function removeFromCart() {
        deleteJSONFromDb("cart_items", id)
        removeCookieFromCart(id);
        updateCookieCount(id, 0);
    }

    return (
        <StyledCartItem>
            <CookieCard {...cookie} />
            {!isFinal ?
                (<div>
                    <label htmlFor="numCookies">Number of Cookies:</label>
                    <div className="input-wrapper">
                        <input
                            type="number"
                            id="numCookies"
                            value={newNumCookies}
                            onChange={handleInputChange}
                            min={0}
                            disabled={isUpdating}
                        />
                    </div>
                    <hr />
                    <p>Subtotal: <strong>{cookie.price*newNumCookies}</strong></p>
                    <Button variant="outline-danger" onClick={removeFromCart}>Remove from Cart</Button>
                </div>)
                : (<div className={isFinal ? "" : "hide"}>
                    <p>Quantity: {numCookies}</p>
                    <hr />
                    <p>Subtotal: <strong>{cookie.price*numCookies}</strong></p>
                </div>)
            }
        </StyledCartItem>
    );
}

export default CartItem;