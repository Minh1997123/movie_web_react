import { BrowserRouter, Routes, Route } from "react-router-dom";
import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";
import CartProvider from "./store/Provider";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Browse />,
  },
  {
    path: "/search",
    element: <Search />,
  },
]);
function App() {
  return (
    <CartProvider>
      <RouterProvider router={router}></RouterProvider>
    </CartProvider>
  );
}

export default App;
