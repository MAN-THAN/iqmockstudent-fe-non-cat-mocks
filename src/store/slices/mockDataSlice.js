import { createSlice } from "@reduxjs/toolkit";

const mockDataSlice = createSlice({
  name: "mockData",
  initialState: {},
  reducers: {
    addMockData(state, action) {
      return {...action.payload};
    },
    addStudentResponse (state, action){
      return {...state, studentResponse : action.payload}
    },
    setCurrentSectionIndex(state, action){
      return {...state, currentSectionIndex : action.payload}
    }
  },
});

export default mockDataSlice.reducer;
export const { addMockData, addStudentResponse, setCurrentSectionIndex } = mockDataSlice.actions;
