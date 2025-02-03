import express from "express";
import userRoutes from "./routes/userRoutes";
import restaurantRoutes from "./routes/restaurantRoutes";
import menuRoutes from "./routes/menuRoutes";
import menuLikesRoutes from "./routes/menuLikesRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";
import path from "path";
import cors from "cors";

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/menuLikes", menuLikesRoutes);
app.use("/api/feedback", feedbackRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

