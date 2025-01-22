import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access cookie ID from URL
import CookieCard from '../components/CookieCard'; // Import CookieCard
import { getReviewsByCookieId } from '../helper';
import {useOutletContext} from "react-router-dom";

const CookieListing = () => {
  const { id } = useParams(); // Get the cookie ID from the URL
  const { cookies } = useOutletContext();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const cookie = cookies.find((cookie) => cookie.id === parseInt(id));

  useEffect(() => {
    if (!id) return; // Ensure ID exists before making API calls
  
    setLoading(true); // Start loading
    
    // Fetch reviews for this cookie
    getReviewsByCookieId(id)
      .then((data) => setReviews(data)) // Get the reviews for the specific cookie
      .catch((error) => console.error('Error fetching reviews:', error))
      .finally(() => setLoading(false)); // Set loading to false when done
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message until data is fetched
  }

  if (!cookie) {
    return <div>Error loading cookie details.</div>; // Error handling if cookie is null
  }
  return (
    <div>
      <h1>Cookie Listing</h1>
      <CookieCard
        id={cookie.id}
        name={cookie.name}
        image={cookie.image}
        price={cookie.price}
        isVegan={cookie.isVegan}
        isGlutenFree={cookie.isGlutenFree}
        hasNuts={cookie.hasNuts}
        frosting={cookie.frosting}
        reviews={reviews}
        favorites={cookie.favorites}
        cartItems={cookie.cartItems}
      />
      <h3>Reviews:</h3>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index}>
            <p><strong>{review.user_id}</strong>: {review.review_body}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default CookieListing;
