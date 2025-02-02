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
import FeedbackList from "./components/FeedbackList";
import MenuLikes from "./components/MenuLikes";


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
            <Route path="/restaurants/:restaurantId/feedback" element={<FeedbackList />} />
            <Route path="/menus/:menuId/likes" element={<MenuLikes />} />
          </Route>
        </Routes>
      </Router>

  );
};

export default App;
