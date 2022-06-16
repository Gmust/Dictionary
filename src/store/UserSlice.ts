import {createSlice} from "@reduxjs/toolkit";




const initialState = {
    id: null,
    token: null,
    email: null,
    isLoading: false
};


export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setupUsers(state, action) {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.token = action.payload.token;


        },
        removeUsers(state) {
            state.id = null;
            state.email = null;
            state.token = null;
        },
        setIsLoading(state){
            state.isLoading = !state.isLoading
        }

    }


});


export const {setupUsers, removeUsers, setIsLoading} = userSlice.actions