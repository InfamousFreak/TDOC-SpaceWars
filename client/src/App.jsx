import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import { GlobalContextProvider } from "./context";
import Market from "./pages/Market";

const App = () => {
  console.log("App is rendering!"); // Debug log

  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/market" element={<Market />} />
        </Routes>
      </GlobalContextProvider>
    </BrowserRouter>
  );
};

export default App;
