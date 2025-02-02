import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Feedback } from "../types/feedback"; // Updated import

const FeedbackList = () => {
  const { restaurantId } = useParams();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/restaurant/${restaurantId}/feedback`);
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [restaurantId]);

  return (
    <div>
      <h1>Feedback</h1>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>
            <p>{feedback.comment}</p>
            <p>Rating: {feedback.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
