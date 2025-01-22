import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Tags from "./Tags";
import { deleteJSONFromDb, postJSONToDb } from "../helper";
import Rating from './Rating';
import { useOutletContext } from "react-router-dom";
import { UserContext } from '../context/userProvider';
import Button from 'react-bootstrap/Button';
import { FaCartPlus, FaRegHeart } from 'react-icons/fa';
import NotLoggedInToast from './NotLoggedInToast';

const StyledCookieCard = styled.article`
    height: 500px;
    max-width: 90vw;
    padding: 10px;
    margin-bottom: 10px;
    position: relative;
    box-shadow: var(--shadow);
    border-radius: 10px;

    img {
        height: 40%;
        box-shadow: var(--shadow);
        // border-radius: 10px;
    }
`

const CookieCard = ({ id, name, image, price, isVegan, isGlutenFree, hasNuts, frosting, reviews, favorites, cartItems }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { cartOrder, addCookieToCart, removeCookieFromCart, addCookieToFavorites, removeCookieFromFavorites } = useOutletContext();
    const [avgReview, setAvgReview] = useState(0);
    const [favoriteId, setFavoriteId] = useState("");
    const [cartId, setCartId] = useState("");
    const [showToast, setShowToast] = useState(false);

    // Update favoriteId when favorites or user changes
    useEffect(() => {
        if (user) {
            const userFavorite = favorites.filter((favorite) => favorite.userId === user.id);
            if (userFavorite.length > 0) {
                setFavoriteId(userFavorite[0].id);
            } else {
                setFavoriteId("");
            }
        }
    }, [favorites, user]);

    useEffect(() => {
        if (cartItems) {
            const userCart = cartItems.filter((cartItem) => cartItem.orderId === cartOrder.id);
            if (userCart.length > 0) {
                setCartId(userCart[0].id);
            } else {
                setCartId("");
            }
        }
    }, [cartItems, user]);

    // Update average review when reviews change
    useEffect(() => {
        if (reviews) {
            if (reviews.length > 0) {
                const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
                const average = totalRating / reviews.length;
                setAvgReview(average);
            } else {
                setAvgReview(0);
            }
        }
    }, [reviews]);

    function handleClick() {
        navigate(`/menu/${id}`);
    }

    function addToCart() {
        if (!user) {
            setShowToast(true);
        }
        else {
            const body = {
                orderId: cartOrder.id,
                cookieId: id
            }
    
            postJSONToDb("cart_items", body)
                .then(cartItem => {
                    console.log(`Added to cart: ${cartItem}`);
                    addCookieToCart(cartItem);
                    setCartId(cartItem.id);
                })
        }
    }

    function removeFromCart() {
        deleteJSONFromDb("cart_items", cartId)
        removeCookieFromCart(cartId);
        setCartId("");
    }

    function addToFavorites() {
        console.log(user)
        if (!user) {
            setShowToast(true);
        }
        else {
            const body = {
                userId: user.id,
                cookieId: id
            }

            postJSONToDb("favorites", body)
                .then(favorite => {
                    console.log(`Added to favorites: ${favorite}`);
                    addCookieToFavorites(favorite);
                    setFavoriteId(favorite.id);
                })
        }
    }

    function removeFromFavorites() {
        deleteJSONFromDb("favorites", favoriteId);
        removeCookieFromFavorites(id, favoriteId);
        setFavoriteId("");
    }

    const tags = [];
    if (isVegan) {
        tags.push("Vegan");
    }

    if (isGlutenFree) {
        tags.push("GF");
    }

    if (hasNuts) {
        tags.push("Contains Nuts");
    }

    return (
        <StyledCookieCard className="cookie-card">
            {showToast &&
                <NotLoggedInToast onClose={() => setShowToast(false)}/>            
            }
            <h2>{name}</h2>
            <h3>`Frosting: {frosting ? frosting : 'None'}`</h3>
            <span>${price}</span>
            <img
                onClick={handleClick}
                src={`images/menu_items/${image}`}
                alt={name}
            />
            <Tags tags={tags} />
            {cartItems &&
                <>
                    <Rating rating={avgReview} />
                    <p>{`Based on ${reviews.length} Reviews`}</p>
                    <p>{`Favorited by ${favorites.length} Users`}</p>
                    {favoriteId ?
                        <Button variant="outline-danger" onClick={removeFromFavorites}><FaRegHeart /> Remove from Favorites</Button> :
                        <Button variant="outline-primary" onClick={addToFavorites}><FaRegHeart /> Add to Favorites</Button>
                    }
                    {cartId ?
                        <Button variant="outline-danger" onClick={removeFromCart}>Remove from Cart</Button> :
                        <Button variant="success" onClick={addToCart}><FaCartPlus /> Add to Cart</Button>
                    }
                </>
            }
        </StyledCookieCard>
    );
}

export default CookieCard;