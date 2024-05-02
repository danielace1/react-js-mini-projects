import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    const currentplayer = localStorage.setItem(
      "role",
      JSON.stringify(selection)
    );
  }, [selection]);

  const handleIconClick = (role) => {
    setSelection(role);
  };

  return (
    <div className="bg-zinc-800 p-20 min-h-screen">
      <div className="text-center space-y-5">
        <div>
          <h2 className="text-white text-4xl font-semibold">
            tic-<span className="text-amber-500">tac</span>-
            <span className="text-sky-500">toe</span>
          </h2>
        </div>

        <div className="bg-zinc-700 py-10 max-w-lg mx-auto rounded shadow-lg">
          <h2 className="text-white text-xl font-semibold">
            Which one you always choose ?
          </h2>

          <div className="bg-zinc-800 py-2.5 mt-8 mx-10 flex items-center rounded-lg">
            <button
              onClick={() => handleIconClick("X")}
              className={`w-full flex justify-center py-2.5 mx-3  ${
                selection === "X" ? "bg-zinc-700" : ""
              } hover:bg-zinc-700 mx-3 hover:py-2.5  rounded-lg hover:rounded-lg transition-all hover:transition-all`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 64 64"
                className="fill-current text-white h-7 w-7"
              >
                <path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"></path>
              </svg>
            </button>

            <button
              onClick={() => handleIconClick("O")}
              className={`w-full flex justify-center py-2.5 mx-3 ${
                selection === "O" ? "bg-zinc-700" : ""
              } hover:bg-zinc-700 mx-3 hover:py-2.5 rounded-lg hover:rounded-lg transition-all hover:transition-all`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 64 64"
                className="fill-current text-white h-7 w-7"
              >
                <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"></path>
              </svg>
            </button>
          </div>

          <div className="mt-10 text-gray-400 text-xs font-semibold">
            REMEMBER : X GOES FIRST
          </div>
        </div>

        <div className="mx-auto max-w-lg space-y-5">
          <div>
            <Link
              to={selection ? { pathname: "/VsCpu" } : ""}
              className={`${!selection && "pointer-events-none"}`}
            >
              <button
                className={`bg-amber-500 w-full px-10 py-3 text-white text-xl font-semibold rounded-lg shadow-lg border-b-2 border-b-amber-300 hover:bg-amber-600  ${
                  !selection && "opacity-50"
                } `}
                onClick={() => selection && handleIconClick("X")}
              >
                1 Player (VS CPU)
              </button>
            </Link>
          </div>

          <div>
            <Link
              to={selection ? { pathname: "/VsPlayer" } : ""}
              className={`${!selection && "pointer-events-none"}`}
            >
              <button
                onClick={() => selection && handleIconClick("O")}
                className={`bg-blue-500 w-full px-10 py-3 text-white text-xl font-semibold rounded-lg shadow-lg border-b-2 border-b-blue-300 hover:bg-blue-600 ${
                  !selection && "opacity-50"
                }`}
              >
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
