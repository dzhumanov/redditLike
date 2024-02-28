import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Post } from "../../types";
import { fetchPosts } from "./postThunk";

interface postsState {
  posts: Post[];
  singlePost: Post | null;
  fetchLoading: boolean;
}

const initialState: postsState = {
  posts: [],
  singlePost: null,
  fetchLoading: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, { payload: posts }) => {
      state.fetchLoading = false;
      state.posts = posts;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.posts;