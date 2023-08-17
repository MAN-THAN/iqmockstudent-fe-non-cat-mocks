import { createSlice } from "@reduxjs/toolkit";

const mockDataSlice = createSlice({
    name : "mockData",
    initialState : {},
    reducers : {
        addMockData(state, action){}
    }

})

export default mockDataSlice.reducer