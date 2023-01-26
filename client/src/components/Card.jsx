import { downloadImage } from "../utils";
import download from "../assets/download.png";

const Card = ({ _id, prompt, name, photo, loading, setLoading }) => {
  const deletePost = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dalle-d9wt.onrender.com/api/v1/posts/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        src={photo}
        alt={prompt}
        className="w-full h-auto object-cover rounded-xl"
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md duration-300 ease-in">
        <p className="text-white text-md overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-full text-white bg-green-700 text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => downloadImage(_id, photo)}
              className="outline-none border-none bg-transparent"
            >
              <img
                src={download}
                alt="download"
                className="w-6 h-6 object-contain invert"
              />
            </button>
            <span
              className="font-bold text-md text-white hover:text-red-500 cursor-pointer"
              onClick={() => deletePost(_id)}
            >
              {loading ? "Deleting..." : "Delete"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
