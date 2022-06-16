import {createSlice} from "@reduxjs/toolkit";



const initialSlice = {
    textValue: ''

}


export const designationSlice = createSlice({
    name: 'designations',
    initialState: initialSlice,
    reducers: {
        setDesignationsText(state, action) {
           state.textValue = action.payload;
        }


    }

})


export const {setDesignationsText} = designationSlice.actions;