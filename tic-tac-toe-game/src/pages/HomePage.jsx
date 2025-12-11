import { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [selection, setSelection] = useState(null);

  const handleIconClick = (role) => {
    setSelection(role);
    localStorage.setItem("role", JSON.stringify(role));
  };

  const isDisabled = !selection;

  return (
    <div className="bg-zinc-800 min-h-screen flex justify-center items-center px-4 py-10 md:p-20">
      <div className="text-center space-y-8 w-full max-w-lg">
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold">
          tic-<span className="text-amber-500">tac</span>-
          <span className="text-sky-500">toe</span>
        </h2>

        <div className="bg-zinc-700 py-8 md:py-10 rounded-lg shadow-lg px-4">
          <h2 className="text-white text-lg md:text-xl font-semibold">
            Which one do you choose?
          </h2>

          <div className="bg-zinc-800 py-3 md:py-2.5 mt-6 md:mt-8 mx-auto flex items-center rounded-lg gap-4 px-3 md:px-3.5 max-w-lg">
            {["X", "O"].map((role) => (
              <button
                key={role}
                onClick={() => handleIconClick(role)}
                className={`w-full flex justify-center py-2 md:py-3 rounded-lg transition
                ${
                  selection === role
                    ? "bg-zinc-700 scale-105"
                    : "hover:bg-zinc-700"
                }`}
              >
                {role === "X" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    className="fill-current text-white h-6 w-6 md:h-7 md:w-7"
                  >
                    <path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    className="fill-current text-white h-6 w-6 md:h-7 md:w-7"
                  >
                    <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          <p className="mt-4 text-gray-400 text-xs md:text-sm font-semibold">
            REMEMBER: X ALWAYS GOES FIRST
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Link
              to={isDisabled ? "#" : "/VsCpu"}
              className={isDisabled ? "pointer-events-none opacity-50" : ""}
            >
              <button className="bg-amber-500 w-full py-3 md:py-4 text-white text-lg md:text-xl font-semibold rounded-lg shadow-lg border-b-2 border-b-amber-300 hover:bg-amber-600 transition">
                1 Player (VS CPU)
              </button>
            </Link>
          </div>

          <div>
            <Link
              to={isDisabled ? "#" : "/VsPlayer"}
              className={isDisabled ? "pointer-events-none opacity-50" : ""}
            >
              <button className="bg-blue-500 w-full py-3 md:py-4 text-white text-lg md:text-xl font-semibold rounded-lg shadow-lg border-b-2 border-b-blue-300 hover:bg-blue-600 transition">
                2 Player (VS PLAYER)
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
