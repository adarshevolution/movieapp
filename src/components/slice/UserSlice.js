import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};
const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { _id, email, token } = action.payload;
      const user = {
        _id,
        email,
        token,
      };
      state.users.push(user);
    },
  },
});

export const { addUser } = UserSlice.actions;
export default UserSlice.reducer;
