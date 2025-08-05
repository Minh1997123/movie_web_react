import { useEffect, useState, useContext } from "react";
import CartContext from "../../store/context";
import { getSrcHandler } from "../../store/store";
import style from "./MovieList.module.css";
import MovieDetail from "../MovieDetail/MovieDetail";
const MovieList = function (props) {
  const [movies, setMovies] = useState({ data: [], movieType: "" });
  const [movieCurrent, setMovieCurrent] = useState();
  const moviesContext = useContext(CartContext);
  useEffect(
    function () {
      // lay danh sach phim tu props va movie detail tu context
      const getDataHandler = async function () {
        const data = await props.data;
        const movieDetail = await moviesContext.dataMovieDetail;
        // xac dinh xem dang xem movie detail tu danh muc nao
        const isShow = movieDetail?.movieType === movies.movieType;
        if (isShow) {
          setMovieCurrent(movieDetail);
          return;
        }
        setMovieCurrent(null);
        setMovies(data);
      };
      getDataHandler();
    },
    [moviesContext.dataMovieDetail]
  );
  //ham  gan thong tin cua movie tu api
  const getMovieDetailHandler = function (movie) {
    // an thong tin phim dang xem khi an vao lan nua
    try {
      if (movie.id === movieCurrent?.id) {
        setMovieCurrent(null);
        return;
      }
      //  lay thong tin cua movie tu api
      moviesContext.getDetailHandler(movie, movies.movieType);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className={style.movielist}>
      <h1>{movies.movieType}</h1>
      <div className={style[`movielist-img`]}>
        {movies.data.map(function (movie) {
          return (
            <img
              key={movie.id}
              src={getSrcHandler(movie.backdrop_path)}
              alt="img movie"
              onClick={() => getMovieDetailHandler(movie)}
            ></img>
          );
        })}
      </div>
      {movieCurrent && <MovieDetail data={movieCurrent}></MovieDetail>}
    </section>
  );
};
export default MovieList;
