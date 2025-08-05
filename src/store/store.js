const API_KEY = `7faa143323cdc02688d89c4ba2766e4e`;

export const requeMoveType = [
  {
    movieType: "xu Hướng",
    fetch: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  },
  {
    movieType: "Xệp hạng cao",
    fetch: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  },
  {
    movieType: "Hành Động",
    fetch: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  {
    movieType: "Hài",
    fetch: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  },
  {
    movieType: "Kinh Dị",
    fetch: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  },
  {
    movieType: "Lãng mạn",
    fetch: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  },
  {
    movieType: "Tài liệu",
    fetch: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  },
];
export const requestOriginal = {
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
};
export const requestSearch = {
  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};
// lay key youtube cua trailer movie
const getTrailerHandler = function (data) {
  try {
    const movieTrailer = data.find(function (movie) {
      return movie.type === "Trailer";
    });
    if (movieTrailer) {
      return movieTrailer.key;
    }
    const movieTeaser = data.find(function (movie) {
      return movie.type === "Teaser";
    });
    if (movieTeaser) {
      return movieTeaser.key;
    }
  } catch (err) {
    // xu ly khi khong co trailer
    console.log(err);
    return null;
  }
};
// lay video tu api cho movie detail
export const getQueryDetailHandler = async function (movie, movieType) {
  try {
    const resQuery = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
    );
    const resData = await resQuery.json();
    const keyMovie = getTrailerHandler(resData.results);
    const movieCurrent = { ...movie, key: keyMovie, movieType: movieType };
    return movieCurrent;
  } catch (err) {
    console.log(err);
    return;
  }
};
// ham tra ve duong link cua anh
export const getSrcHandler = function (url) {
  if (url) {
    return `https://image.tmdb.org/t/p/original/${url}`;
  }
  return null;
};

// ham lay du lieu tu api origin
export const getOriginlHandler = async function () {
  try {
    const resQuery = await fetch(
      `https://api.themoviedb.org/3${requestOriginal.fetchNetflixOriginals}`
    );
    const resData = await resQuery.json();
    return resData.results;
  } catch (err) {
    console.log(err);
    return;
  }
};
// lay du lieu tu api search
export const getSearchHandler = async function (movie) {
  try {
    const resQuery = await fetch(
      `https://api.themoviedb.org/3${requestSearch.fetchSearch}&query=${movie}`
    );
    const resData = await resQuery.json();
    return resData.results;
  } catch (err) {
    console.log(err);
    return;
  }
};
// lay du lieu tu api movie type
export const getMovieTypeHandler = async function () {
  try {
    const quests = requeMoveType.map(function (item) {
      return fetch(`https://api.themoviedb.org/3${item.fetch}`);
    });
    const resQuery = await Promise.all(quests);
    const movies = resQuery.map(async function (item, index) {
      const resData = await item.json();
      return {
        movieType: requeMoveType[index].movieType,
        data: resData.results,
      };
    });
    return movies;
  } catch (err) {
    console.log(err);
    return;
  }
};
