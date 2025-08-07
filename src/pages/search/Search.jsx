import NavBar from "../../component/Navbar/NavBar";
import SearchForm from "../../component/SearchForm/SearchForm";
import style from "./Search.module.css";
import { useState, useContext, useEffect, useCallback } from "react";
import ResultList from "../../component/ResultList/ResultList";
import MovieDetail from "../../component/MovieDetail/MovieDetail";
import CartContext from "../../store/context";
const Search = () => {
  const [movies, setMovies] = useState([]);
  const [movieCurrent, setMovieCurrent] = useState();
  const moviesContext = useContext(CartContext);
  useEffect(
    function () {
      // ham lay du lieu movie detail tu context
      const getDataHandler = async function () {
        const data = await moviesContext.dataMovieDetail;
        setMovieCurrent(data);
      };
      getDataHandler();
    },
    [moviesContext]
  );
  // ham set danh sach phim tim kiem
  const setMoviesHandler = useCallback(function (data) {
    setMovies(data);
    setMovieCurrent(null);
  }, []);
  // lay thong tin cua movie
  const getMovieDetailHandler = function (movie) {
    // an thong tin phim dang xem khi an vao lan nua
    if (movie.id === movieCurrent?.id) {
      setMovieCurrent(null);
      return;
    }
    //  lay thong tin cua movie tu context
    moviesContext.getDetailHandler(movie);
  };
  return (
    <div className={style.search}>
      <NavBar></NavBar>
      <SearchForm setMovies={setMoviesHandler}></SearchForm>
      <h2>Search Result</h2>
      <ul>
        {movies.map(function (movie) {
          return (
            <ResultList
              key={movie.id}
              movie={movie}
              getMovie={getMovieDetailHandler}
            ></ResultList>
          );
        })}
      </ul>
      {movieCurrent && <MovieDetail data={movieCurrent}></MovieDetail>}
    </div>
  );
};

export default Search;
