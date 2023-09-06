import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NoteApi from "../Apis/NoteApi";

const initialState = {
    note: {},
    mynotes: [],
    loading: false,
    error: "",
};

// NoteApi calls

export const CreateNotes = createAsyncThunk(
    "api/note/createnote",
    async(NoteData, thunkAPI) => {
        try {
            return await NoteApi.CreateNote(NoteData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// get user Notes
export const GetUserNote = createAsyncThunk(
    "api/note/mynotes",
    async(id, thunkAPI) => {
        try {
            return await NoteApi.GetUserNotes(id);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);
const NotesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CreateNotes.pending, (state) => {
                state.loading = true;
            })
            .addCase(CreateNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.note = action.payload;
            })
            .addCase(CreateNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        // get user notes
        .addCase(GetUserNote, (state) => {
            state.loading = true;
        })

        .addCase(GetUserNote.fulfilled, (state, action) => {
            state.loading = false;
            state.mynotes = action.payload;
        })

        .addCase(GetUserNote.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const {} = NotesSlice.actions;

export default NotesSlice.reducer;