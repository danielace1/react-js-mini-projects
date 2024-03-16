import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import VsCPU from "./pages/1Player.jsx";
import VsPlayer from "./pages/2Players.jsx";
import HomePage from "./pages/HomePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "/VsCpu",
        element: <VsCPU />,
      },
      {
        path: "/VsPlayer",
        element: <VsPlayer />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
