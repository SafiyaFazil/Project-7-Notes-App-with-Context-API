
import { configureStore } from "@reduxjs/toolkit";
import NotesReducer from "./NotesSlice";
import taskReducer from "./TaskSlice"; 

export const store = configureStore({
  reducer: {
    NotesPageReducer: NotesReducer,
    tasks: taskReducer,
  },
});