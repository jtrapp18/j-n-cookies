import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { getJSON } from 'helper';

function App() {

  [user, setUser] = useState(null);
  [cookies, setCookies] = useState([]);

  useEffect(() => {
    getJSON("menu_items").then((menu_items) => {
      const menuTransformed = snakeToCamel(menu_items).map(cookie => ({
        ...cookie,
      }));
      setCookies(menuTransformed);      
    });

  }, [user]);

  return (
    <>
      <Header />
      <Outlet
          context={{
            user,
            cookies,
          }}
        />
      <Footer />
    </>
  );
}

export default App;