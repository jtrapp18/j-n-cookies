import {useEffect, useState, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Tags from "./Tags"
import { deleteJSONFromDb, getReviewsByCookieId, postJSONToDb, userLogout } from "../helper";
import Rating from './Rating';
import {useOutletContext} from "react-router-dom";
import {UserContext} from '../context/userProvider'

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

const CookieCard = ({id, name, image, price, isVegan, isGlutenFree, hasNuts, frosting, reviews, favorites}) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { cartOrder, addCookieToCart, removeCookieFromCart, addCookieToFavorites, removeCookieFromFavorites } = useOutletContext();
    const [avgReview, setAvgReview] = useState(0);
    const [favoriteId, setFavoriteId] = useState("");
    const [cartId, setCartId] = useState("");

    // Update favoriteId when favorites or user changes
    useEffect(() => {
        const userFavorite = favorites.filter((favorite) => favorite.userId === user.id);
        if (userFavorite.length > 0) {
        setFavoriteId(userFavorite[0].id);
        } else {
        setFavoriteId("");
        }
    }, [favorites, user]);

    // Update average review when reviews change
    useEffect(() => {
        if (reviews.length > 0) {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const average = totalRating / reviews.length;
        setAvgReview(average);
        } else {
        setAvgReview(0);
        }
    }, [reviews]);

    function handleClick() {
        navigate(`/menu/${id}`);
    }

    function handleClickHeart() {
        console.log('clicked heart');
    }

    function addToCart() {
        const body = {
            numCookies: 1,
            orderId: cartOrder.id,
            cookieId: id
        }

        postJSONToDb("cart_items", body)
        .then(cartItem=>{
            console.log(`Added to cart: ${cartItem}`)
            addCookieToCart(cartItem);
            setCartId(cartItem.id);
        })
    }

    function removeFromCart() {
        deleteJSONFromDb("cart_items", cartId)
        removeCookieFromCart(cartId);
        setCartId("");
    }

    function addToFavorites() {
        const body = {
            userId: user.id,
            cookieId: id
        }

        postJSONToDb("favorites", body)
        .then(favorite=>{
            console.log(`Added to favorites: ${favorite}`)
            addCookieToFavorites(favorite);
            setFavoriteId(id, favorite.id);
        })
    }

    function removeFromFavorites() {
        deleteJSONFromDb("favorites", favoriteId)
        removeCookieFromFavorites(id, favoriteId);
        setFavoriteId("");
    }

    const tags = []
    if (isVegan) {
        tags.push("Vegan")
    }

    if (isGlutenFree) {
        tags.push("GF")
    }

    if (hasNuts) {
        tags.push("Contains Nuts")
    }

    return (
        <StyledCookieCard
        >
            <h2>{name}</h2>
            <h3>`Frosting: {frosting ? frosting : 'None'}`</h3>
            <span>${price}</span>
            <img 
                onClick={handleClick}
                src={`images/menu_items/${image}`}
                alt={name}
            >
            </img>
            <Rating rating={avgReview}/>
            <p>{`Based on ${reviews.length} Reviews`}</p>
            <p>{`Favorited by ${favorites.length} Users`}</p>
            <Tags
                tags={tags}
            />
            {favoriteId ?
                <button onClick={removeFromFavorites}>Remove from Favorites</button>
            :
                <button onClick={addToFavorites}>Add to Favorites</button>
            }
            {cartId ?
                <button onClick={removeFromCart}>Remove from Cart</button>
            :
                <button onClick={addToCart}>Add to Cart</button>
            }

        </StyledCookieCard>
    );
}

export default CookieCard;
