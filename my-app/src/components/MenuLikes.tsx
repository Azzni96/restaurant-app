import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type Like = {
  id: number;
  user_id: number;
  menu_id: number;
};

const MenuLikes = () => {
  const { menuId } = useParams();
  const [likes, setLikes] = useState<Like[]>([]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/menu/${menuId}/likes`);
        setLikes(response.data);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [menuId]);

  return (
    <div>
      <h1>Menu Likes</h1>
      <ul>
        {likes.map((like) => (
          <li key={like.id}>
            <p>User ID: {like.user_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuLikes;
