import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import PropTypes from "prop-types";

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 w-full max-w-lg bg-white/20 backdrop-blur-md shadow-lg rounded-2xl p-3 border border-white/30"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="🔍 Search for a city..."
        className="flex-1 bg-transparent p-2 outline-none text-white placeholder-gray-200 text-lg"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white p-3 rounded-xl flex items-center justify-center shadow-md transition-transform transform hover:scale-105"
      >
        <FiSearch size={22} />
      </button>
    </form>
  );
}
