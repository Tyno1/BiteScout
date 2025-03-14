import { Course } from "@/types/foodCatalogue";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CourseState {
  courseData: Course[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const serverApi = import.meta.env.VITE_BACKEND_SERVER;

const initialState: CourseState = {
  courseData: [{ _id: "", name: "", description: "" }],
  status: "idle",
  error: null,
};

export const createCourse = createAsyncThunk(
  "course/createCourse",
  async (courseData: Course) => {
    const response = await axios.post(
      `${serverApi}/api/food-catalogue/course`,
      courseData
    );
    return response.data;
  }
);
export const getCourse = createAsyncThunk("course/getCourse", async () => {
  const response = await axios.get(`${serverApi}/api/food-catalogue/course`);
  return response.data;
});

const CourseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.courseData = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error has occurred";
      })

      .addCase(getCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.courseData = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error has occurred";
      });
  },
});

export default CourseSlice.reducer;
