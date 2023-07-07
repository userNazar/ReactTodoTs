import { createSlice } from "@reduxjs/toolkit";


interface initialStateProps {
    timeSeconds: number;
}

const initialState: initialStateProps = {
    timeSeconds: 0
}



const timeSessiom = createSlice({
    name: 'timeSesion',
    initialState,
    reducers: {
        addSecond: state => {
            state.timeSeconds += 1;
        }
    }
})


export const { addSecond } = timeSessiom.actions;

export default timeSessiom;