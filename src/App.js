import React from "react";
import Dashboard from "./Components/Dashboard";
import Navbar from "../src/Components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Dashboard />
      </div>
    </>
  );
}

export default App;
