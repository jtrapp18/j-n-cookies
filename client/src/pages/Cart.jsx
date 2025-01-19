import {useContext} from "react";
import Login from './Login'
import {UserContext} from '../context/userProvider'

const Cart = () => {
  const { user, setUser } = useContext(UserContext);

  if (!user) return <Login />

  return (
    <main>
      <p>this is the cart page</p>
    </main>
  );
};

export default Cart;
