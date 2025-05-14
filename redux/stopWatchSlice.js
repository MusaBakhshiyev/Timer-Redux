import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: new Date(0, 0, 0, 0, 0, 0),
    isRunning: false,
    history: []
};

export const stopWatchSlice = createSlice({
    name: "stopwatch",
    initialState,
    reducers: {
        incrementTime: (state) => {
            state.value = new Date(state.value.getTime() + 1000);
        },
        resetTime: (state) => {
            state.value = new Date(0, 0, 0, 0, 0, 0);
            state.isRunning = false;
            state.history = [];
        },
        startTimer: (state) => {
            state.isRunning = true;
        },
        pauseTimer: (state) => {
            state.isRunning = false;
        },
        saveHistory: (state) => {
            const h = state.value.getHours().toString().padStart(2, "0");
            const m = state.value.getMinutes().toString().padStart(2, "0");
            const s = state.value.getSeconds().toString().padStart(2, "0");
            const formattedTime = `${h}:${m}:${s}`;
            state.history.push(formattedTime);
        }
    }
});

export const { incrementTime, resetTime, startTimer, pauseTimer, saveHistory } = stopWatchSlice.actions;
export default stopWatchSlice.reducer;
