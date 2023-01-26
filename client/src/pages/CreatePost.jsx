import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import preview from "../assets/preview.png";
import { getRandomPrompt } from "../utils";

import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(
        "https://dalle-d9wt.onrender.com/api/v1/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      await response.json();
      navigate("/");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // HANDLE PROMPT RANDOMIZATION
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  //GENERATE IMAGE
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGenerating(true);
        const response = await fetch(
          "https://dalle-d9wt.onrender.com/api/v1/ai",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGenerating(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  return (
    <div>
      <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
      <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
        Create imaginative and visually stunning images through DALL-E AI and
        share them with the community
      </p>
      <form onSubmit={handleSubmit} className="mt-16 max-w-3xl">
        <div className="flex flex-col gap-5">
          {/* Name Input */}
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />

          {/* Prompt Input */}
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A Space Shuttle flying above Cape Town, digital art"
            handleChange={handleChange}
            isSurpriseMe
            value={form.prompt}
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-9/12 h-9/12 object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {/* Loading modal while generating image */}
            {generating && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        {/* Generate Button wrapper */}
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generating ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[16px]">
            Once generated image has been created you can share it with others
            in the community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
