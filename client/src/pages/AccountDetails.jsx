import {useOutletContext} from "react-router-dom";
import Login from './Login'

const AccountDetails = () => {
  const { user } = useOutletContext();

  if (!user) return <Login />

    return (
      <main>
        <p>this is account details page</p>
      </main>
    );
  };
  
  export default AccountDetails;
  