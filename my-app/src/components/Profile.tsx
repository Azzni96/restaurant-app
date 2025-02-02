import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profileData, setProfileData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProfileData(response.data);
      } catch (error: any) {
        setMessage(error.response?.data.error || "An error occurred");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div>
        <h1>Profile</h1>
        {message && <p>{message}</p>}
        <p>Name: {profileData.name}</p>
        <p>Email: {profileData.email}</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Profile;
