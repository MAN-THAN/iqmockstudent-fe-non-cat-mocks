import { createSlice } from '@reduxjs/toolkit'


const userDataSlice = createSlice({
    name : "userData",
    initialState : [],
    reducers : {
        addUserData(state, action){
            state.push(action.payload)
        }
    }
});

console.log(userDataSlice)

export default userDataSlice.reducer 
export const { addUserData } = userDataSlice.actions;