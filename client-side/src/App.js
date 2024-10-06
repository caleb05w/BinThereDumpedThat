import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { CreateBin } from "./pages/CreateBin";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import BinAlert from "./BinAlert";
import SideBar from "./components/SideBar";
import { BinProvider } from "./context/BinContext";

function App() {
  return (
    <BinProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/createBin"
            element={<ProtectedRoute element={<CreateBin />} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/binAlert" element={<BinAlert />} />
          <Route path="/sideBar" element={<SideBar />} />
        </Routes>
      </Router>
    </BinProvider>
  );
}

export default App;
