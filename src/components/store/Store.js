import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "../slice/MovieSlice";
import UserReducer from "../slice/UserSlice";
const store = configureStore({
  reducer: {
    movies: MovieReducer,
    users: UserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
