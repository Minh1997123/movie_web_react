import style from "./NavBar.module.css";
import { useState, memo, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router";
import CartContext from "../../store/context";
import { requestMoveType } from "../../store/store";
const NavBar = memo(function () {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isScroll, setIsScroll] = useState();
  const [page, setPage] = useState(Number(searchParams.get("page")));
  const moviesContext = useContext(CartContext);
  const navigate = useNavigate();

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
      // lay du movie theo so page
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
  //   ham chuyen trang den home
  const toHomeHandler = function () {
    navigate("/");
  };
  //   ham chuyen trang de nsearch
  const toSearchHandler = function () {
    navigate("/search");
  };
  //   lang nghe hanh dong cuon trang
  document.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      setIsScroll("bl");
    }
    if (window.scrollY === 0) {
      setIsScroll("tp");
    }
  });
  return (
    <div
      className={`${style.navbar} ${isScroll === "bl" && style.navbar__black} ${
        isScroll === "tp" && style.navbar__transparent
      }`}
    >
      <p onClick={toHomeHandler}>Movie App</p>

      <svg
        onClick={toSearchHandler}
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
  );
});
export default NavBar;
