import React, { useState, useContext } from "react";
import {postJSONToDb} from '../helper'
import styled from "styled-components";
import {UserContext} from '../context/userProvider'
import CookieCard from './CookieCard'
import CloseButton from 'react-bootstrap/CloseButton';
import Rating from '../components/Rating'

const ReviewContainer = styled.div`
  position: fixed;
  z-index: 1000;
  top: var(--height-header);
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid black;
  background: var(--gray);

  .main-review {
    padding: 20px;
    background: white;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;

    form {
      display: flex;
      flex-direction: column;
      width: 90%;
      padding: 20px;
      align-items: center;

      .form-input {
        &:not(:last-child) {
          margin-bottom: 12px;
        }

        input:hover, textarea:hover {
          background: var(--yellow);
        }

        display: flex;
        flex-direction: column;
        align-items: space-between;
        width: 90%;
      }
    }

    .submitted-confirm {
      background: var(--green);
      border-radius: 20px;
      padding: 20px;

      label {
        font-weight: bold;
      }

      p, label, h3 {
        color: white;
      }
    }
  }
`

function ReviewForm({ cookie, setActiveReview }) {
  const { user } = useContext(UserContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emptyForm = {
    reviewTitle: "",
    rating: 0,
    reviewBody: ""
  }
  const [formData, setFormData] = useState(emptyForm);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(prevData=>{
        return {
            ...prevData,
            [name]: value,
        }
    });
}

  function updateRating(rating) {
    setFormData(prevData=>{
        return {
            ...prevData,
            rating: rating,
        }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const body = {
        ...formData,
        user_id: user.id,
        cookie_id: cookie.id
    }

    postJSONToDb("reviews", body)
    .then(review=> {
      console.log(review)
      setIsSubmitted(true);
    })
  }

  return (
    <ReviewContainer>
      <CloseButton onClick={()=>setActiveReview(null)}/>
        <div className="main-review">
        {(!isSubmitted) ? (
          <>
            <h1>{`Review ${cookie.name} Cookie`}</h1>
            <CookieCard {...cookie}/>
            <form onSubmit={handleSubmit}>
              <Rating rating={formData.rating} handleStarClick={updateRating}/>
              <div className="form-input">
                <label htmlFor="reviewTitle">Title</label>
                <input
                  type="text"
                  id="reviewTitle"
                  name="reviewTitle"
                  autoComplete="off"
                  value={formData.reviewTitle}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input">
                <label htmlFor="reviewBody">Description</label>
                <textarea
                  id="reviewBody"
                  name="reviewBody"
                  autoComplete="off"
                  value={formData.reviewBody}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button type="submit">Submit Review</button>
              </div>
            </form>
          </>
        ) : (
          <div className="submitted-confirm">
            <h3>Thank you for your review!</h3>
            <hr />
            <Rating rating={formData.rating} handleStarClick={updateRating}/>
            <div>
              <label htmlFor="reviewTitle">Review Title:</label>
              <p name="reviewTitle">{formData.reviewTitle}</p>
            </div>
            <div>
            <label htmlFor="reviewBody">Review:</label>
            <p name="reviewBody">{formData.reviewBody}</p>
            </div>
          </div>
        )}
      </div>
    </ReviewContainer>
  );
}

export default ReviewForm;
