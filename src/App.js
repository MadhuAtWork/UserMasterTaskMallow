// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import UserListPage from "./Components/UserListPage";
import "./App.css";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/users" element={<UserListPage />} />
    </Routes>
  );
};

export default App;
