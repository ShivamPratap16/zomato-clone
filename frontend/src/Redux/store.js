import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducer/rootReducer"; // Ensure this path is correct
import {thunk }from "redux-thunk";

// Conditionally import redux-logger only in development mode
let logger;
if (process.env.NODE_ENV === "development") {
  import("redux-logger").then(({ logger: loggerModule }) => {
    logger = loggerModule;
  });
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk).concat(logger || []),
});

export default store;
