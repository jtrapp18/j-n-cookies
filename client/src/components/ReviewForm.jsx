import React, { useState, useContext } from "react";
import {useOutletContext} from "react-router-dom";
// import { Button, Error, Input, FormField, Label, Textarea } from "../styles";
import {postJSONToDb} from '../helper'
import styled from "styled-components";
import {UserContext} from '../context/userProvider'
import CookieCard from './CookieCard'
import CloseButton from 'react-bootstrap/CloseButton';
import Rating from '../components/Rating'

const ReviewContainer = styled.div`
  padding: 10px;
  position: fixed;
  z-index: 1000;
  top: var(--height-header);
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid black;
`

const Button = styled.button` 
`

const Error = styled.button`
`

const Input = styled.input`
`

const FormField = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const Label = styled.label`
`

function ReviewForm({ cookie, setActiveReview }) {
  const { user } = useContext(UserContext);

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

    postJSONToDb("review", body)
    .then(console.log)
  }

  return (
    <ReviewContainer>
      <CloseButton onClick={()=>setActiveReview(null)}/>
      <CookieCard {...cookie}/>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="reviewTitle">Title</Label>
          <Input
            type="text"
            id="reviewTitle"
            name="reviewTitle"
            autoComplete="off"
            value={formData.reviewTitle}
            onChange={handleChange}
          />
        </FormField>
        <Rating rating={filterInput.rating} handleStarClick={updateRating}/>
        <FormField>
          <Label htmlFor="rating">Rating</Label>
          <Input
            type="text"
            id="rating"
            name="rating"
            autoComplete="off"
            value={formData.rating}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <Label htmlFor="reviewBody">Description</Label>
          <Input
            type="text"
            id="reviewBody"
            name="reviewBody"
            autoComplete="off"
            value={formData.reviewBody}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <Button type="submit">Submit Review</Button>
        </FormField>
      </form>
    </ReviewContainer>
  );
}

export default ReviewForm;
