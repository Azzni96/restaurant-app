import { BrowserRouter as Router, Route, Routes } from "react-router";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Layout from './components/Layout';
import Home from "./components/Home";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import RestaurantList from "./components/RestaurantList";
import MenuList from "./components/MenuList";
import MenuLikes from "./components/MenuLikes";
import AddRestaurant from "./components/AddRestaurant";
import AddMenu from "./components/AddMenu";
import FeedbackList from "./components/FeedbackList"; // Ensure this import is present

const App = () => {
  return (

      <Router>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/restaurants/:restaurantId/menus" element={<MenuList />} />
            <Route path="/add-restaurant" element={<AddRestaurant />} />
            <Route path="/restaurants/:restaurantId/add-menu" element={<AddMenu />} />
            <Route path="/restaurants/:restaurantId/feedback" element={<FeedbackList />} /> // Ensure this route path is correct
            <Route path="/menus/:menuId/likes" element={<MenuLikes />} />
          </Route>
        </Routes>
      </Router>

  );
};

export default App;
