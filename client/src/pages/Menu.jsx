import {useEffect, useContext, useState} from 'react';
import styled from "styled-components";
import Filters from "../components/Filters";
import {WindowWidthContext} from "../context/windowSize";
import {useOutletContext} from "react-router-dom";
import CookieCard from '../components/CookieCard';

const StyledMain = styled.main`
`

const CardContainer = styled.div`
`

const Menu = () => {
  const { isMobile } = useContext(WindowWidthContext);
  const { cookies } = useOutletContext();

  const [filterInput, setFilterInput] = useState({
    price: 0,
    rating: 0,
    isVegan: "",
    isGlutenFree: "",
    hasNuts: "",
    hasFrosting: ""
  });

  const showCookies = cookies

//   const showCookies = cookies.filter(cookie=>{

//     // const searchFilter = searchInput==="" ? true : cookie.name.toLowerCase().includes(searchInput.toLowerCase());
//     const priceFilter = filterInput.price ? filterInput.price >= cookie.price : true;
//     const ratingFilter = filterInput.rating ? filterInput.rating <= cookie.rating : true;
//     const veganFilter = filterInput.isVegan ? true : cookie.isVegan;
//     const glutenFreeFilter = filterInput.isGlutenFree ? true : cookie.isGlutenFree;
//     const nutsFilter = filterInput.hasNuts ? true : cookie.hasNuts;
//     const frostingFilter = filterInput.hasFrosting ? true : cookie.frosting != null;

//     return priceFilter && ratingFilter && veganFilter && glutenFreeFilter && nutsFilter && frostingFilter;   
// })
    return (
      <StyledMain>
        {/* {!isMobile && 
          <Filters
            filterInput={filterInput}
            setFilterInput={setFilterInput}
          />
        } */}
        <CardContainer>
          {showCookies.map(cookie=>
            <CookieCard
                key={cookie.id}
                {...cookie} 
            />
          )}
        </CardContainer>
      </StyledMain>
    );
  };
  
  export default Menu;
  