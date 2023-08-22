import { createSlice } from "@reduxjs/toolkit";

const mockDataSlice = createSlice({
  name: "mockData",
  initialState: {},
  reducers: {
    addMockData(state, action) {
      return {...action.payload};
    },
  },
});

export default mockDataSlice.reducer;
export const { addMockData } = mockDataSlice.actions;
