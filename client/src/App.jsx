import React, {useState, useEffect, useContext} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { getJSON, snakeToCamel } from './helper';
import { UserContext } from './context/userProvider';

function App() {

  const { user, setUser } = useContext(UserContext);
  const [cookies, setCookies] = useState([]);

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

  return (
    <>
      <Header/>
      <Outlet
          context={{
            cookies,
          }}
        />
      <Footer />
    </>
  );
}

export default App;