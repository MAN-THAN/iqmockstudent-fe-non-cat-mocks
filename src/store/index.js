import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./slices/userDataSlice";
import mockDataSlice from "./slices/mockDataSlice";

const store = configureStore({
    reducer : {
        userData : userDataSlice,
        mockData : mockDataSlice
    }
})

export {store};