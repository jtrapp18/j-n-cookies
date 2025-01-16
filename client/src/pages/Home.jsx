import React, {useContext} from 'react';
import {WindowWidthContext} from "../context/windowSize";

const Home = () => {
  const { isMobile } = useContext(WindowWidthContext);

  return (
    <main>
      <p>this is the main page</p>
    </main>
  );
};

export default Home;