import {useContext} from "react";
import Login from './Login'
import {UserContext} from '../context/userProvider'

const AccountDetails = () => {
  const { user, setUser } = useContext(UserContext);

  if (!user) return <Login />

    return (
      <main>
        <p>this is account details page</p>
      </main>
    );
  };
  
  export default AccountDetails;
  