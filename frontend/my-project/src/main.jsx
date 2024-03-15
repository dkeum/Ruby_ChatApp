import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import TextChat from "./pages/TextChat.jsx";
import VideoChat from "./pages/VideoChat.jsx";
import GroupChat from "./pages/GroupChat.jsx";
import Settingboard from "./pages/SettingBoard.jsx";

import Login from "./pages/auth/Login.jsx";
import { CreateAccount } from "./pages/auth/CreateAccount.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { SocketProvider } from "./hooks/useSocket.jsx";

// import ProtectedRoute from "./components/ProtectedRoute.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/textchat" element={<TextChat />} />
            <Route path="/videochat" element={<VideoChat />} />
            <Route path="/groupchat" element={<GroupChat />} />
            <Route path="/settingboard" element={<Settingboard />} />
            <Route path="/createaccount" element={<CreateAccount />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </Provider>
  </React.StrictMode>
);
