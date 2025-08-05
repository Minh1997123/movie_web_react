import style from "./Searchform.module.css";
import { useContext, useEffect, useRef } from "react";
import CartContext from "../../store/context";
const SearchForm = function (props) {
  const moviesContext = useContext(CartContext);
  const form = useRef();
  useEffect(
    function () {
      const getDataHandler = async function () {
        const data = await moviesContext.dataSearch;
        props.setMovies(data);
      };
      getDataHandler();
    },
    [moviesContext.dataSearch]
  );
  const handleSubmit = async function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataInput = Object.fromEntries(formData.entries());
    moviesContext.getSearchcHandler(dataInput.movie);
  };
  return (
    <form className={style.form} onSubmit={handleSubmit} ref={form}>
      <div className={style[`form-input`]}>
        <input name="movie" required></input>
        <svg
          className="svg-inline--fa fa-search fa-w-16"
          fill="#ccc"
          aria-hidden="true"
          data-prefix="fas"
          data-icon="search"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </div>
      <div className={style[`form-button`]}>
        <button type="button" onClick={() => form.current.reset()}>
          RESET
        </button>
        <button>SEARCH</button>
      </div>
    </form>
  );
};
export default SearchForm;
