import { configureStore } from "@reduxjs/toolkit";
import TrainerNameSlice from "./slices/TrainerName.slice";


export default configureStore({
    reducer: {
        trainerName: TrainerNameSlice
    }
})