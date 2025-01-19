import {useOutletContext} from "react-router-dom";

const Cart = () => {
  const { user } = useOutletContext();

  if (!user) return <Login />

  return (
    <main>
      <p>this is the cart page</p>
    </main>
  );
};

export default Cart;
