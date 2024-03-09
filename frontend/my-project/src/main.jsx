import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NavContext } from "./providers/NavContext.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import TextChat from "./pages/TextChat.jsx";
import VideoChat from "./pages/VideoChat.jsx";
import GroupChat from "./pages/GroupChat.jsx";

const router = createBrowserRouter([
  {
    path: "/hello",
    element: <div>Hello world!</div>,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/textchat",
    element: <TextChat />,
  },
  {
    path: "/videochat",
    element: <VideoChat/>,
  },
  {
    path: "/groupchat",
    element: <GroupChat/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NavContext.Provider>
      <RouterProvider router={router} />
    </NavContext.Provider>
  </React.StrictMode>
);
