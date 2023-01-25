import express from "express";
import { OpenAIApi, Configuration } from "openai";
import dotenv from "dotenv";

const router = express();
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});


const openai = new OpenAIApi(configuration);

router.route("/").post(async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = response.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).json(error?.response.data.error.message);
  }
});

export default router;
