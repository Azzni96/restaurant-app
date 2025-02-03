import { useState } from "react";
import axios from "axios";
import { Feedback } from "../types/feedback"; // Ensure you have a Feedback type defined
import { useParams } from "react-router-dom";
import './FeedbackList.css'; // Add this line

const FeedbackList = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>(); // Ensure the parameter name matches the route definition
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
      if (!token) {
        console.error("No token found");
        return;
      }
      console.log("Token:", token); // Debugging log
      const response = await axios.post("http://localhost:3000/api/feedback", {
        restaurant_id: restaurantId,
        comment,
        rating
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the headers
        }
      });
      console.log("Response:", response); // Debugging log
      if (response.status === 201) {
        setFeedbacks([...feedbacks, response.data]);
        setComment("");
        setRating(null);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div>
      <h1>Feedback</h1>
      <ul>
        {Array.isArray(feedbacks) && feedbacks.map((feedback, index) => (
          <li key={feedback.id ?? index}>  {/* Fallback to index if id is missing */}
            <p>{feedback.comment}</p>
            <p>Rating: {feedback.rating}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating ?? ""}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackList;
