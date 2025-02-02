import { useEffect, useState } from "react";
import axios from "axios";
import { Restaurant } from "../types/restaurant"; // Updated import path

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/restaurant");
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      <h1>Restaurants</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.address}</p>
            <p>{restaurant.phone}</p>
            {restaurant.image && <img src={restaurant.image} alt={restaurant.name} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
