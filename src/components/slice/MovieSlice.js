import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};
const MovieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovie: (state, action) => {
      const movies = action.payload;
      movies.map((movie) => state.movies.push(movie));
    },
    addMovie: (state, action) => {
      const { title, publishYear, image } = action.payload;
      const movie = {
        id: nanoid(),
        title,
        publishYear,
        image: URL.createObjectURL(image),
      };
      state.movies.push(movie);
    },
    editMovie: (state, action) => {
      const { id, title, publishYear, image } = action.payload;
      const editedMovie = state.movies.find((movie) => movie.id === id);
      if (editedMovie) {
        editedMovie.title = title;
        editedMovie.publishYear = publishYear;
        editedMovie.image = image;
      }
    },
  },
});

export const { setMovie, addMovie, editMovie } = MovieSlice.actions;
export default MovieSlice.reducer;
