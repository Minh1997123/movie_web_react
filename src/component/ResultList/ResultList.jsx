import { getSrcHandler } from "../../store/store";
import style from "./ResultList.module.css";
const ResultList = function (props) {
  // ham lay dy lieu phim dang duoc chon
  const getMovieDetailHandler = function () {
    props.getMovie(props.movie);
  };
  return (
    <li className={style["resultlist"]} onClick={getMovieDetailHandler}>
      <img src={getSrcHandler(props.movie.poster_path)}></img>
    </li>
  );
};
export default ResultList;
