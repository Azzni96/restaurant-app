import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type Menu = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
};

const MenuList = () => {
  const { restaurantId } = useParams();
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/restaurant/${restaurantId}/menus`);
        setMenus(response.data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, [restaurantId]);

  return (
    <div>
      <h1>Menus</h1>
      <ul>
        {menus.map((menu) => (
          <li key={menu.id}>
            <h2>{menu.name}</h2>
            <p>{menu.description}</p>
            <p>{menu.price}</p>
            {menu.image && <img src={menu.image} alt={menu.name} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
