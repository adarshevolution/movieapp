import React, { useRef, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addMovie, editMovie } from "./slice/MovieSlice";

const CreateMovie = () => {
  const { eid } = useParams();
  const updateMovie = useSelector((state) => state.movies.movies);
  const existingMovie = updateMovie.filter((movie) => movie.id === eid);
  const [title, setTitle] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [image, setImage] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const newError = {};

  const [editTitle, setEditTitle] = useState(existingMovie[0]?.title);
  const [editPublishYear, setEdiPublishYear] = useState(
    existingMovie[0]?.publishYear
  );
  const [editImage, setEditImage] = useState(existingMovie[0]?.image);

  const handleClick = (event) => {
    inputRef.current.click();
  };

  const handelImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title) {
      newError.title = "Title is Required";
    }
    if (!publishYear) {
      newError.publishYear = "Publication Year is Required";
    } else if (isNaN(publishYear)) {
      newError.publishYear = "Publish year must be a number ";
    } else if (publishYear.length < 4) {
      newError.publishYear = "Publish Year must have a length of at least 4 ";
    }
    if (!image) {
      newError.image = "Image is Required";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
    } else {
      dispatch(addMovie({ title, publishYear, image }));
      navigate("/movies");
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    if (!editTitle) {
      newError.title = "Title is Required for Update.";
    }
    if (!editPublishYear) {
      newError.publishYear = "Publication Year is Required";
    } else if (isNaN(editPublishYear)) {
      newError.publishYear = "Publish year must be a number ";
    } else if (editPublishYear.length < 4) {
      newError.publishYear = "Publish Year must have a length of at least 4 ";
    }
    if (Object.keys(newError).length > 0) {
      setError(newError);
    } else {
      const oldImage = image || editImage;
      if (typeof oldImage === "object") {
        dispatch(
          editMovie({
            id: eid,
            title: editTitle,
            publishYear: editPublishYear,
            image: URL.createObjectURL(oldImage),
          })
        );
        navigate("/movies");
      }
      if (typeof oldImage === "string") {
        dispatch(
          editMovie({
            id: eid,
            title: editTitle,
            publishYear: editPublishYear,
            image: oldImage,
          })
        );
        navigate("/movies");
      }
    }
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    navigate("/movies");
  };

  return (
    <>
      <div className="p-10 ">
        <h1 className="font-semibold text-5xl">
          {eid ? "Edit" : "Create a new movie"}
        </h1>
        <div className="flex justify-center pt-10  ">
          <form onSubmit={eid ? handleUpdate : handleSubmit}>
            <div className="flex flex-col gap-5">
              <div className=" h-[400px] min-w-96 md:w-[400px] border-2 rounded-xl border-dashed  flex flex-col justify-center items-center bg-input-color md:order-1 order-2">
                <div onClick={handleClick}>
                  {image || editImage ? (
                    <img
                      src={eid ? editImage : URL.createObjectURL(image)}
                      alt="Uploaded Pic"
                      className="h-60 w-72 object-cover"
                    />
                  ) : (
                    <FiDownload />
                  )}
                </div>
                <label htmlFor="image" className="pt-5">
                  {eid
                    ? editImage
                      ? image.name
                      : ""
                    : image
                    ? image.name
                    : "Drop an image here"}
                </label>
                <input
                  id="image"
                  type="file"
                  placeholder="Publishing Year"
                  name="publishYear"
                  ref={inputRef}
                  onChange={handelImageChange}
                  className="text-black hidden "
                  accept=".jpg, .jpeg, .png "
                />
                {error.image && (
                  <span className="text-red-500 italic ">{error.image}</span>
                )}
              </div>
              <div className="flex gap-4 md:order-3 order-3">
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className=" rounded-xl w-full md:w-40 h-14 border-white border  font-bold "
                >
                  Cancle
                </button>
                <button
                  type="submit"
                  className=" rounded-xl w-full md:w-40 h-14 bg-primary font-bold "
                >
                  {eid ? "Update" : "Submit"}
                </button>
              </div>

              <div className="flex flex-col gap-6 order-1 md:order-2">
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={eid ? editTitle : title}
                  onChange={
                    eid
                      ? (e) => setEditTitle(e.target.value)
                      : (e) => setTitle(e.target.value)
                  }
                  className={`bg-input-color rounded-xl w-full md:w-76 h-11  placeholder:text-slate-100 pl-4
                  `}
                />
                {error.title && (
                  <span className="text-red-500 italic ">{error.title}</span>
                )}
                <input
                  type="text"
                  placeholder="Publishing Year"
                  name="publishYear"
                  value={eid ? editPublishYear : publishYear}
                  onChange={
                    eid
                      ? (e) => setEdiPublishYear(e.target.value)
                      : (e) => setPublishYear(e.target.value)
                  }
                  className="bg-input-color rounded-xl w-full md:w-52 h-11 pl-4 placeholder:text-slate-100"
                />
                {error.publishYear && (
                  <span className="text-red-500 italic ">
                    {error.publishYear}
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateMovie;
