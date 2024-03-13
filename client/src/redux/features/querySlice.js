import { createSlice } from "@reduxjs/toolkit";

export const querySlice = createSlice({
    name: 'query',
    initialState: {
        startLocationInfo: {},
        destinationInfo: {},
    },
    reducers: {
        setStartLocationInfo: (state, action) => {
            state.startLocationInfo = action.payload;
        },
        setDestinationInfo: (state, action) => {
            state.destinationInfo = action.payload;
        }
    },
});

export const { setStartLocationInfo, setDestinationInfo } = querySlice.actions;