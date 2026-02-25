import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../redux/slices/userSlice";
import studentReducer from "../redux/slices/studentSlice";
import staffReducer from "../redux/slices/staffSlice";
import leadsReducer from "../redux/slices/leadsSlice";
import courseReducer from "./slices/courseSlice";
import transactionReducer from "./slices/transacitonSlice";
import roleReducer from "./slices/roleSlice";
import authReducer from './slices/authSlice';
import batchReducer from './slices/batchSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    students: studentReducer,
    staff: staffReducer,
    leads: leadsReducer,
    courses: courseReducer,
    transactions: transactionReducer,
    roles : roleReducer,
    auth : authReducer,
    batches : batchReducer,
  },
});

export default store;
