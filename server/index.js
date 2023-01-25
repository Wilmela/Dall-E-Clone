import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import allRoutes from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

//  App routes
app.use("/api/v1/", allRoutes);

app.use("/", (req, res) => {
  res.send("Hello, Welcome from DALL-E");
});

//  Default error handler
app.use("/", (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const runServer = () => {
  mongoose.set({ strictQuery: true });
  mongoose.connection.on("disconnected", () => console.log("Db disconnected"));

  mongoose
    .connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected"))
    .catch((err) => console.log(err));

  app.listen(8080, console.log(`Server running on port 8080`));
};

runServer();
