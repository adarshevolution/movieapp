import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdAddCircleOutline, MdOutlineLogout } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const Movie = (props) => {
  const { data } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    return () => {
      axios
        .get("https://jsonplaceholder.typicode.com/photos")
        .then((res) => setMovies(res.data));
    };
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(movies.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(movies.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, movies]);

  const handlePageClick = (event) => {
    const newOffSet = (event.selected * itemsPerPage) % movies.length;
    setItemOffset(newOffSet);
  };
  return (
    <>
      <div className="flex justify-between p-20">
        <div className="flex items-baseline">
          <h2 className="font-semibold text-5xl">My movies</h2>
          <Link to={"/create"}>
            <MdAddCircleOutline size={26} className="ml-3" />
          </Link>
        </div>
        <div className="flex items-center">
          <h3 className="font-semibold text-base invisible md:visible">
            Logout
          </h3>
          <Link to={"/"}>
            <MdOutlineLogout size={22} className="ml-2" />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 justify-items-center items-center px-20 w-full">
        {currentItems.map((movie) => (
          <div
            className=" h-[500px] bg-card-color rounded-xl flex flex-col justify-around"
            key={movie.id}
          >
            <img
              src={movie.url}
              alt="Movie"
              className="w-full md:px-2 h-[400px] rounded-xl flex justify-center items-center"
            />
            {/* <h1>{movie.title}</h1> */}
            <h1 className="font-medium text-xl pl-2">Movie 1</h1>
            <p className="font-light text-sm pl-2">{movie.id}</p>
          </div>
        ))}
      </div>
      <></>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <span className="bg-card-color  flex item-center justify-cente rounded-md p-1">
            Next
          </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={
          <span className="bg-card-color  flex item-center justify-cente rounded-md p-1">
            Prev
          </span>
        }
        renderOnZeroPageCount={null}
        containerClassName="flex item-center justify-center py-40 gap-4 "
        pageClassName="block w-8 h-8 flex item-center justify-center bg-card-color rounded-md"
        activeClassName="bg-primary rounded index-5"
      />
    </>
  );
};

export default Movie;
