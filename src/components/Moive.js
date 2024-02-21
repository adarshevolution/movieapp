import React, { useEffect, useState } from "react";
import { MdAddCircleOutline, MdOutlineLogout } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const Movie = ({ movies }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(movies.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(movies.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, movies]);

  const handlePageClick = (event) => {
    const newOffSet = (event.selected * itemsPerPage) % movies.length;
    setItemOffset(newOffSet);
  };

  const handleLogout = (event) => {
    localStorage.clear();
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
            <MdOutlineLogout
              size={22}
              className="ml-2"
              onClick={handleLogout}
            />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 justify-items-center items-center px-20 w-full">
        {currentItems.map((movie, _id) => (
          <Link
            to={`/movies/${movie._id}`}
            key={_id}
            className=" h-[500px] bg-card-color rounded-xl flex flex-col justify-around"
          >
            <img
              src={movie.image}
              alt={movie.image}
              className="w-96 md:px-2 h-[400px] rounded-xl flex justify-center items-center object-cover"
            />
            <h1 className="font-medium text-xl pl-2">{movie.title}</h1>
            <p className="font-light text-sm pl-2">{movie.publishYear}</p>
          </Link>
        ))}
      </div>
      <></>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <span className="bg-card-color flex item-center justify-cente rounded-md p-1">
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
        pageClassName=" w-8 flex item-center justify-center bg-card-color rounded-md"
        activeClassName="bg-primary rounded index-5"
      />
    </>
  );
};

export default Movie;
