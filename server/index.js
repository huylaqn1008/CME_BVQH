import express from "express";
import cors from "cors";
import { AdminRoute } from "./routes/AdminRoute.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use("/auth", AdminRoute);
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server is running");
});
