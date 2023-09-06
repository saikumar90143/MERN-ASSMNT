import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./ReduxSlice/UserSlice";
import NotesSlice from "./ReduxSlice/NotesSlice";

const store = configureStore({
    reducer: {
        user: UserSlice,
        note: NotesSlice,
    },
});

export default store;