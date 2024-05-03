import "./App.css";
import Grille from "./component/Grille.jsx";
import { useState } from "react";

function App() {
  const [level, setLevel] = useState("easy");

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };
  return (
    <div className="flex flex-col gap-6 justify-center items-center w-screen h-screen ">
      <div className="relative inline-block text-left">
        <select
          className="border-2 border-gray-300 rounded-md text-gray-700 py-2 px-4 pr-8 bg-white appearance-none leading-tight focus:outline-none focus:border-blue-500"
          value={level}
          onChange={handleLevelChange}
        >
          <option value="easy">Facile</option>
          <option value="medium">Moyen</option>
          <option value="hard">Difficile</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 12l-8-8 1.5-1.5L10 9l6.5-6.5L18 4z" />
          </svg>
        </div>
      </div>
      <Grille level={level} />
    </div>
  );
}

export default App;
