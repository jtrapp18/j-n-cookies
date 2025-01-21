import {useEffect, useContext, useState} from 'react';
import styled from "styled-components";
import Filters from "../components/Filters";
import {WindowWidthContext} from "../context/windowSize";
import {useOutletContext} from "react-router-dom";
import CookieCard from '../components/CookieCard';
import SearchBar from '../components/SearchBar';

const StyledMain = styled.main`
`

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`

const Menu = () => {
  const { isMobile } = useContext(WindowWidthContext);
  const { cookies } = useOutletContext();

  const [searchInput, setSearchInput] = useState("");
  const [filterInput, setFilterInput] = useState({
      price: 0,
      rating: 0,
      isVegan: "",
      isGlutenFree: "",
      nutFree: "",
      hasFrosting: ""
  });

  const showCookies = cookies.filter(cookie=>{

      let avgReview
      if (cookie.reviews.length > 0) {
        const totalRating = cookie.reviews.reduce((sum, review) => sum + review.rating, 0);
        avgReview = totalRating / cookie.reviews.length;
      } else {
        avgReview = 0;
      }
   
      const searchFilter = searchInput==="" ? true : cookie.name.toLowerCase().includes(searchInput.toLowerCase());
      const priceFilter = filterInput.price ? filterInput.price >= cookie.price : true;
      const ratingFilter = filterInput.rating ? filterInput.rating <= avgReview : true;
      const veganFilter = !filterInput.isVegan ? true : cookie.isVegan;
      const glutenFreeFilter = !filterInput.isGlutenFree ? true : cookie.isGlutenFree;
      const nutsFilter = !filterInput.nutFree ? true : !cookie.hasNuts;
      const frostingFilter = !filterInput.hasFrosting ? true : cookie.frosting != null;

      return searchFilter && priceFilter && ratingFilter && veganFilter && glutenFreeFilter && nutsFilter && frostingFilter;   
  })

  return (
      <StyledMain>
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          <Filters
            filterInput={filterInput}
            setFilterInput={setFilterInput}
          />
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
  