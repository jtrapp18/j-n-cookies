import {useState, useEffect, useContext} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { getJSON, getJSONById, snakeToCamel } from './helper';
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
      });
    }
  }, [user]);

  useEffect(() => {
    if (user && orders.length > 0) {
      const cart = orders.find((order) => !order.purchaseComplete) || null;
      setCartOrder(cart);
    }
  }, [orders, user]);

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
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order === cartOrder
          ? {
              ...order,
              cartItems: [...order.cartItems, { ...cartItem, numCookies: 1 }],
            }
          : order
      )
    );
  }

  function removeCookieFromCart(cartId) {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order === cartOrder
          ? {
              ...order,
              cartItems: order.cartItems.filter((item) => item.id !== cartId),
            }
          : order
      )
    );
  }

  function updateCookieCount(cartId, newCount) {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order === cartOrder
          ? {
              ...order,
              cartItems: order.cartItems.map((item) =>
                item.id === cartId ? { ...item, count: newCount } : item
              ),
            }
          : order
      )
    );
  }

  function placeCookieOrder(orderId, updatedOrder) {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              ...updatedOrder,
            }
          : order
      )
    );
  }

  function createNewCart(newOrderId) {
    console.log(newOrderId)

    getJSONById("orders", newOrderId).then((order) => {
      const newOrder = snakeToCamel(order);

      setOrders((prevOrders) => [
        ...prevOrders,
        newOrder
      ])
    });
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
            removeCookieFromFavorites,
            placeCookieOrder,
            createNewCart
          }}
        />
      <Footer />
    </>
  );
}

export default App;