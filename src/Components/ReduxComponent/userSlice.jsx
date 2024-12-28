// redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://reqres.in/api/users";

// Fetch users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Delete user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    await axios.delete(`${API_URL}/${userId}`);
    return userId;
  }
);

// Edit user
export const editUser = createAsyncThunk("users/editUser", async (userData) => {
  const response = await axios.put(`${API_URL}/${userData.id}`, userData);
  return response.data;
});

// Create user
export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData) => {
    const response = await axios.post(API_URL, userData);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.data;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.list.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload); // Add new user to the list
      });
  },
});

export default userSlice.reducer;
