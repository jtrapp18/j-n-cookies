import {useState, useEffect, useContext} from 'react';
import Login from './Login'
import styled from 'styled-components';
import OrderCard from '../components/OrderCard';
import {getJSON, snakeToCamel} from '../helper'
import {UserContext} from '../context/userProvider'
import ReviewForm from '../components/ReviewForm';
import {useOutletContext} from "react-router-dom";

const StyledMain = styled.main`
  min-height: var(--size-body);
  padding: 20px;
  90vh;
  display: flex;
  flex-direction: column;
`

const CardContainer = styled.div`
  padding: 20px;
  margin: 10px;
  display: grid;
  // box-shadow: var(--shadow);
  gap: 0;

  // article.cookie-card {
  //   transform: scale(.7);
  //   transform-origin: top left;
  // }
`

const OrderHistory = () => {
  const { user, setUser} = useContext(UserContext);
  const [activeReview, setActiveReview] = useState(null);
  const { orders } = useOutletContext();

  const showOrders = orders.filter(order=>order.purchaseComplete)

  if (!user) return <Login />

  return (
      <StyledMain>
          {/* <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          <Filters
            filterInput={filterInput}
            setFilterInput={setFilterInput}
          /> */}
        <h1>Order History</h1>
        <CardContainer>
          {showOrders.map(order=>
            <OrderCard
                key={order.id}
                order={order} 
                setActiveReview={setActiveReview}
            />
          )}
        </CardContainer>
        {activeReview && 
          <ReviewForm 
            cookie={activeReview} 
            setActiveReview={setActiveReview}
          />
        }
      </StyledMain>
    );
  };
  
  export default OrderHistory;