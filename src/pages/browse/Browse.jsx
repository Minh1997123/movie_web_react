import Banner from "../../component/Banner/Banner";
import style from "./Browse.module.css";
import Poster from "../../component/Poster/Poster";
import MovieList from "../../component/Movielist/MovieList";
import { useContext, useState, useEffect } from "react";
import CartContext from "../../store/context";
import NavBar from "../../component/Navbar/NavBar";
import { useSearchParams } from "react-router";
import { requestMoveType } from "../../store/store";

const Browse = function () {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(Number(searchParams.get("page")));
  const moviesContext = useContext(CartContext);

  // ham tinh toan vi tri hien tai va kiem tra nguoi dung da keo den cuoi trang chua
  const loaderHandler = function () {
    return (
      document.documentElement.scrollHeight -
        window.innerHeight -
        window.scrollY ===
      0
    );
  };

  // kiem tra hanh dong keo xuong cuoi trang
  document.addEventListener("scroll", () => {
    const loader = loaderHandler();
    // tinh so page cuoi cung co the load
    const maxPage = Math.floor(requestMoveType.length / 3) + 1;
    // ket thuc load khi so trang lon hon haoc bang so trang toi da
    const isEnd = maxPage <= page;
    if (loader && !isEnd) {
      setPage(page + 1);
    }
  });

  // thay doi search param va load movie khi page thay doi
  useEffect(
    function () {
      // goi ham lay du movie theo so page
      moviesContext.getMovieTypeHandler(page);
      // gan page luc bat dau la 1
      if (!page) {
        setPage(1);
      }
      if (page > 1) {
        // set search param page theo so page hien tai
        return setSearchParams(`?page=${page}`);
      }
    },
    [page]
  );

  // lay danh sach movie tu context khi trang thay doi
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
  // xoa danh sach movie va thong tin phim dang xem khi component bi xoa
  useEffect(function () {
    return () => {
      moviesContext.getMovieTypeHandler(null);
      moviesContext.getDetailHandler(null);
    };
  }, []);
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
