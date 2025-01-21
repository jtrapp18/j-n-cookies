import React, {useState, useEffect, useContext} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { getJSON, snakeToCamel } from './helper';
import { UserContext } from './context/userProvider';

function App() {

  const { user, setUser } = useContext(UserContext);
  const [cookies, setCookies] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cartOrder, setCartOrder] = useState("");

  useEffect(() => {
    
    getJSON("cookies").then((cookies) => {
      const menuTransformed = snakeToCamel(cookies);
      setCookies(menuTransformed);
    });

  }, []);

  useEffect(() => {
    // auto-login
    getJSON("check_session")
    .then((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (user) { 
      getJSON("orders").then((orders) => {
        const orderTransformed = snakeToCamel(orders);
        setOrders(orderTransformed);

        const cartOrder = orderTransformed.filter(order=>!order.purchaseComplete)[0]
        setCartOrder(cartOrder);
      });
    }

  }, [user]);

  function addCookieToFavorites(cookieId, favorite) {
    setCookies((prevCookies) =>
      prevCookies.map((cookie) =>
        cookie.id === cookieId
          ? {
              ...cookie,
              favorites: [...cookie.favorites, favorite],
            }
          : cookie
      )
    );
  }

  function removeCookieFromFavorites(cookieId, favoriteId) {
    setCookies((prevCookies) =>
      prevCookies.map((cookie) =>
        cookie.id === cookieId
          ? {
              ...cookie,
              favorites: cookie.favorites.filter((favorite) => favorite.id !== favoriteId),
            }
          : cookie
      )
    );
  }

  function addCookieToCart(cartItem) {
    setCartOrder(prevCartOrder=>({
      ...prevCartOrder,
      cartItems: [...prevCartOrder.cartItems, cartItem]
    }))
  }

  function removeCookieFromCart(cartId) {
    setCartOrder(prevCartOrder => ({
      ...prevCartOrder,
      cartItems: prevCartOrder.cartItems.filter(item => item.id !== cartId)
    }));
  }

  function updateCookieCount(cartId, newCount) {
    setCartOrder((prevCartOrder) => ({
        ...prevCartOrder,
        cartItems: prevCartOrder.cartItems.map((item) =>
        item.id === cartId ? { ...item, count: newCount } : item
        ),
    }));
  }

  return (
    <>
      <Header/>
      <Outlet
          context={{
            cookies,
            orders,
            cartOrder,
            addCookieToCart,
            removeCookieFromCart,
            updateCookieCount,
            addCookieToFavorites,
            removeCookieFromFavorites
          }}
        />
      <Footer />
    </>
  );
}

export default App;