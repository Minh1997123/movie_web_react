import CartContext from "./context";
import {
  getOriginlHandler as getOrigin,
  getSearchHandler as getSearch,
  getMovieTypeHandler as getMovieType,
  getQueryDetailHandler as getDetail,
} from "./store";
import { useEffect, useReducer } from "react";
const defaultCartState = {
  dataOriginal: [],
  dataSearch: [],
  dataMovieType: [],
  dataMovieDetail: null,
};
const cartReducer = function (state, action) {
  // lay du lieu tu api ogigin
  if (action.type === "ORIGIN") {
    return {
      ...state,
      dataOriginal: getOrigin(),
    };
  }
  //   lay du lieu tu api search
  if (action.type === "SEARCH") {
    return {
      ...state,
      dataSearch: getSearch(action.movie),
    };
  }
  // lay giu liệu tu api movie type
  if (action.type === "MOVIES") {
    return {
      ...state,
      dataMovieType: getMovieType(),
    };
  }
  //   lay du lieu tu api detail
  if (action.type === "DETAIL") {
    return {
      ...state,
      dataMovieDetail: getDetail(action.movie, action.movieType),
    };
  }
  return defaultCartState;
};
const CartProvider = function (props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  //   ham lay du lieu tu api origin
  const getOriginlHandler = function () {
    dispatchCartAction({ type: "ORIGIN" });
  };
  //   ham lay du lieu tu api search
  const getSearchHandler = function (movie) {
    dispatchCartAction({ type: "SEARCH", movie: movie });
  };
  //   ham lay du lieu tu api movie type
  const getMovieTypeHandler = function () {
    dispatchCartAction({ type: "MOVIES" });
  };
  //   ham lay du lieu tu api detail
  const getDetailHandler = function (movie, movieType) {
    dispatchCartAction({ type: "DETAIL", movie: movie, movieType: movieType });
  };
  //   state chung
  const cartContext = {
    dataOriginal: cartState.dataOriginal,
    dataSearch: cartState.dataSearch,
    dataMovieType: cartState.dataMovieType,
    dataMovieDetail: cartState.dataMovieDetail,
    getMovieTypeHandler: getMovieTypeHandler,
    getOriginHandler: getOriginlHandler,
    getSearchcHandler: getSearchHandler,
    getDetailHandler: getDetailHandler,
  };

  useEffect(function () {
    cartContext.getOriginHandler();
    cartContext.getMovieTypeHandler();
  }, []);
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
