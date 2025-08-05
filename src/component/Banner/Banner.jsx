import { getSrcHandler } from "../../store/store";
import { useEffect, useState, useContext } from "react";
import style from "./Banner.module.css";
import CartContext from "../../store/context";
const Banner = function () {
  const [infoMovie, setInfoMovie] = useState({
    backdrop_path: null,
    name: "",
    overview: "",
  });
  const movies = useContext(CartContext);
  //      ham lay 1 so ngau nhien
  const randomNumberHandler = function (results) {
    return Math.floor(Math.random() * results.length - 1);
  };

  useEffect(
    function () {
      // ham lay du lieu tu context
      const getDataHandler = async function () {
        const data = await movies.dataOriginal;
        if (data.length > 0) {
          // lay 1 phim ngau nhien
          const dataMovie = data[randomNumberHandler(data)];
          // khi co 1 phim hong duong link thi lay phim khac
          if (!dataMovie) {
            getDataHandler();
          }
          setInfoMovie(dataMovie);
        }
      };
      getDataHandler();
    },
    [movies.dataOriginal]
  );
  return (
    <div className={style.banner}>
      <img src={getSrcHandler(infoMovie.backdrop_path)}></img>
      <div className={style[`banner-info`]}>
        <h1>{infoMovie.name}</h1>
        <button>Play</button>
        <button>My List</button>
        <p>{infoMovie.overview}</p>
      </div>
    </div>
  );
};
export default Banner;
