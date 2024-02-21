import React, { useEffect, useState } from "react";
import Movie from "./Moive";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

const Movies = () => {
  const [showMovie, setShowMovie] = useState(true);
  let [movies, setMovies] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    return () => {
      axios
        .get("/movies", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        // .then((res) => setMovies(res.data));
        .then((res) => {
          return setMovies(res.data);
        })
        .catch((err) => console.log(err));
    };
  }, [token]);

  useEffect(() => {
    if (movies.length > 0) {
      setShowMovie(false);
    }
  }, [movies]);

  return (
    <>
      {showMovie ? (
        <div className="flex flex-col justify-center items-center min-h-screen   tracking-wide mx-6	">
          <div className="md:font-semibold font-semibold text-4xl md:text-5xl mb-10">
            Your movie list is empty
          </div>
          <Link to={"/create"}>
            <button className="font-bold text-base bg-primary rounded-[10px] h-14 w-full md:w-72  text-center">
              Add a new movie
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <Movie movies={movies} />
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Movies;
