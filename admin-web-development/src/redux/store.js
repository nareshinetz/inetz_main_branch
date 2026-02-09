import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../redux/slices/userSlice";
import studentReducer from "../redux/slices/studentSlice";
import staffReducer from "../redux/slices/staffSlice";
import leadsReducer from "../redux/slices/leadsSlice";
import courseReducer from "./slices/courseSlice"
import transactionReducer from "./slices/transacitonSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    students: studentReducer,
    staff: staffReducer,
    leads: leadsReducer,
    course: courseReducer,
    transactions : transactionReducer,
  },
});

export default store;