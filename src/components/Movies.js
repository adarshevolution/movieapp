import React, { useState } from "react";
import Movie from "./Moive";
import { Outlet } from "react-router-dom";

const Movies = () => {
  const [showMovie, setShowMovie] = useState(false);

  return (
    <>
      {showMovie ? (
        <div className="flex flex-col justify-center items-center min-h-screen   tracking-wide mx-6	">
          <div className="md:font-semibold font-semibold text-4xl md:text-5xl mb-10">
            Your movie list is empty
          </div>
          <button className="font-bold text-base bg-primary rounded-[10px] h-14 w-full md:w-72  text-center">
            Add a new movie
          </button>
        </div>
      ) : (
        <div>
          <Movie />
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Movies;
