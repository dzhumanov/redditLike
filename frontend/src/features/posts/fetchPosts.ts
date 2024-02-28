import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Post } from "../../types";

export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchAll",
  async () => {
    const response = await axiosApi.get<Post[]>("/posts");
    return response.data;
  }
);
