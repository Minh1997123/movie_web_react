import Banner from "../../component/Banner/Banner";
import style from "./Browse.module.css";
import Poster from "../../component/Poster/Poster";
import MovieList from "../../component/Movielist/MovieList";
import { useContext, useState, useEffect } from "react";
import CartContext from "../../store/context";
import NavBar from "../../component/Navbar/NavBar";
const Browse = function () {
  const [movies, setMovies] = useState([]);
  const moviesContext = useContext(CartContext);
  useEffect(
    function () {
      // lay du llieu tu context
      const getDataHandler = async function () {
        const data = await moviesContext.dataMovieType;
        setMovies((pre) => {
          return pre.concat(data);
        });
      };
      getDataHandler();
    },
    [moviesContext.dataMovieType]
  );
  return (
    <div className={style.browse}>
      <NavBar></NavBar>
      <Banner></Banner>
      <div className={style.body}>
        <Poster></Poster>
        {movies.map(function (item, index) {
          return <MovieList data={item} key={index}></MovieList>;
        })}
      </div>
    </div>
  );
};

export default Browse;
