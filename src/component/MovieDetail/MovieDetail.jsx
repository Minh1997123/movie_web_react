import style from "./MovieDetail.module.css";
import { getSrcHandler } from "../../store/store";
const MovieDetail = function (props) {
  const {
    title,
    key,
    release_date,
    vote_average,
    overview,
    name,
    backdrop_path,
  } = props.data;
  return (
    <div className={style.moviedetail}>
      <section className={style["moviedetail__info"]}>
        <h1>{title || name}</h1>
        <h4>{release_date}</h4>
        <h4>{`${vote_average}/10`}</h4>
        <p>{overview}</p>
      </section>
      {key ? (
        <iframe src={`https://www.youtube.com/embed/${key}`}></iframe>
      ) : (
        <img src={getSrcHandler(backdrop_path)}></img>
      )}
    </div>
  );
};
export default MovieDetail;
