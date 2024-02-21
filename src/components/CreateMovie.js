import React, { useEffect, useRef, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addMovie, editMovie } from "./slice/MovieSlice";
import axios from "axios";

const CreateMovie = () => {
  const { eid } = useParams();
  const token = localStorage.getItem("token");

  const [movie, setMovie] = useState({
    title: "",
    publishYear: "",
    image: "",
  });
  const { title, publishYear, image } = movie;

  const getMovieById = () => {
    if (eid && eid !== null) {
      axios
        .get(`${eid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const editMovie = res.data;
          setMovie({
            title: editMovie.title,
            publishYear: editMovie.publishYear,
            // image: `http://localhost:5000/${editMovie.image}`,
            image: editMovie.image,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getMovieById();
  }, [eid]);

  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const newError = {};
  const handleClick = (event) => {
    inputRef.current.click();
  };

  const handelImageChange = (event) => {
    setMovie((prev) => ({ ...prev, image: event.target.files[0] }));
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
      const formData = new FormData();
      formData.append("title", title);
      formData.append("publishYear", publishYear);
      formData.append("image", image);
      axios
        .post("/movies/create", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => navigate("/movies"))
        .catch((err) => console.log(err));
      // dispatch(addMovie({ title, publishYear, image }));
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    if (!title) {
      newError.title = "Title is Required for Update.";
    }
    if (!publishYear) {
      newError.publishYear = "Publication Year is Required";
    } else if (isNaN(publishYear)) {
      newError.publishYear = "Publish year must be a number ";
    } else if (publishYear.length < 4) {
      newError.publishYear = "Publish Year must have a length of at least 4 ";
    }
    if (Object.keys(newError).length > 0) {
      setError(newError);
    } else {
      const editFormData = new FormData();
      editFormData.append("title", title);
      editFormData.append("publishYear", publishYear);
      editFormData.append("image", image);
      axios
        .put(`/movies/edit/${eid}`, editFormData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => navigate("/movies"))
        .catch((err) => console.log(err));
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
              <div className=" min-h-96 min-w-96 md:w-[400px] border-2 rounded-xl border-dashed  flex flex-col justify-center items-center bg-input-color md:order-1 order-2">
                <div onClick={handleClick}>
                  {image ? (
                    eid ? (
                      <img
                        src={
                          typeof image == "string"
                            ? `http://localhost:5000/${image}`
                            : URL.createObjectURL(image)
                        }
                        alt="Uploaded Pic"
                        className="h-60 w-72 object-cover"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Uploaded Pic"
                        className="h-60 w-72 object-cover"
                      />
                    )
                  ) : (
                    // <img
                    //   src={eid ? image : URL.createObjectURL(image)}
                    //   alt="Uploaded Pic"
                    //   className="h-60 w-72 object-cover"
                    // />
                    <FiDownload />
                  )}
                </div>
                <label htmlFor="image" className="pt-5">
                  {eid
                    ? image
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
                  accept="image/*"
                />
                {error.image && (
                  <span className="text-red-500 italic ">{error.image}</span>
                )}
              </div>
              <div className="flex gap-4 md:order-3 order-3">
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className=" rounded-xl w-full md:w-40 h-14 border-white border  font-bold  relative"
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
                  value={title}
                  onChange={(e) =>
                    setMovie((prev) => ({ ...prev, title: e.target.value }))
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
                  value={movie.publishYear}
                  onChange={(e) =>
                    setMovie((prev) => ({
                      ...prev,
                      publishYear: e.target.value,
                    }))
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
