import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";
import CartProvider from "./store/Provider";
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
