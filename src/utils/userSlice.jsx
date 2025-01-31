import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addUser: (state, action) => { // when the user logins this action will be dispatched
            return action.payload; //this value of action.payload goes to state
        },
        removeUser: (state, action) => {
            return null;
        }
    }
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;