import { createContext } from "react";

const CartContext = createContext({
  dataOriginal: [],
  dataSearch: [],
  dataMovieType: [],
});

export default CartContext;
