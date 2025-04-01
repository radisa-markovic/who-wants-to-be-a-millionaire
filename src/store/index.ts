import { configureStore } from "@reduxjs/toolkit";

import quizReducer from './quiz';

export const store = configureStore({
  reducer: {
    quiz: quizReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;