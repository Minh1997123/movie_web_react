import { useEffect, useState, useContext } from "react";
import style from "./Poster.module.css";
import CartContext from "../../store/context";
import MovieDetail from "../MovieDetail/MovieDetail";
const Poster = function () {
  const [infoMovies, setInfoMovies] = useState([]);
  const [movieCurrent, setMovieCurrent] = useState();
  const moviesContext = useContext(CartContext);
  useEffect(
    function () {
      // lay du lieu phim tu context
      const getDataHandler = async function () {
        // lay du lieu tu context
        const data = await moviesContext.dataOriginal;
        const movieDetail = await moviesContext.dataMovieDetail;
        //   lay 10 phim dau tien
        const dataMovie = data.filter(function (item, index) {
          return index < 10;
        });
        //  xac dinh xem dang xem movie detail tu danh muc nao
        setInfoMovies(dataMovie);
        const isShow = movieDetail?.movieType === "ORIGINAL";
        if (isShow) {
          setMovieCurrent(movieDetail);
          return;
        }
        setMovieCurrent(null);
      };
      getDataHandler();
    },
    [moviesContext]
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
      moviesContext.getDetailHandler(movie, "ORIGINAL");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className={style.poster}>
        {infoMovies.map(function (movie) {
          return (
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              onClick={() => getMovieDetailHandler(movie)}
            ></img>
          );
        })}
      </div>
      {movieCurrent && <MovieDetail data={movieCurrent}></MovieDetail>}
    </div>
  );
};
export default Poster;
