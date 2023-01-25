import express from "express";
import aiRoutes from "./ai.js";
import postRoutes from "./post.js";

const router = express();
router.use("/posts", postRoutes);
router.use("/ai", aiRoutes);

export default router;
