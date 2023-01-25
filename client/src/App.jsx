import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import logo from "./assets/logo.svg";

import { Home, CreatePost } from "./pages";
function App() {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 p-4 border-b border-b-[#e6e6f4">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>

        <Link
          to="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 lg:px-12 xl:px-32 w-full bg-[#f1f5f8] min-h-[calc(100vh-73px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
