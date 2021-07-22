import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Chat from "./Chat";
import Header from "./Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Chat />
    </div>
  );
}

export default App;
