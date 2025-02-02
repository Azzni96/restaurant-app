import React, { useState } from "react";
import { useNavigate } from "react-router";
import { handleSubmit } from "../utils/handleSubmit"; // Updated import

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(
      "http://localhost:3000/api/users/login",
      formData,
      setMessage,
      navigate,
      "/profile"
    );
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
