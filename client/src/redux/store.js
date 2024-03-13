import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./features/uislice";
import { aiCardSlice } from "./features/aiCard";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        aiCard: aiCardSlice.reducer,
    },
});

export default store;