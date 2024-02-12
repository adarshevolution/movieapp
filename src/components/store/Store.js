import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "../slice/MovieSlice";
const store = configureStore({
  reducer: {
    movies: MovieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
