import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { designationSlice } from "./DesignationSlice";
import {userSlice} from "./UserSlice";


const rootReducer = combineReducers({
            user: userSlice.reducer,
            designations: designationSlice.reducer
});



export const setupStore = () => configureStore({
    reducer: rootReducer,
});


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch  = AppStore['dispatch'];


