import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../Apis/UserApi";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
    loading: false,
    user: user ? user : null,
    signup: null,
    error: "",
};
// signup slice
export const SignUpSlice = createAsyncThunk(
    "auth/signup",
    async(formData, thunkAPI) => {
        try {
            return await AuthService.UserSignup(formData);
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

// login slice
export const LoginSlice = createAsyncThunk(
    "auth/signin",
    async(formData, thunkAPI) => {
        try {
            return await AuthService.UserLogin(formData);
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

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        LogOut: (state, action) => {
            localStorage.clear();
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
        // signup actions
            .addCase(SignUpSlice.pending, (state, action) => {
            state.loading = true;
        })

        .addCase(SignUpSlice.fulfilled, (state, action) => {
            (state.signup = action.payload), (state.loading = false);
            state.error = "";
        })

        .addCase(SignUpSlice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // login actions
        .addCase(LoginSlice.pending, (state, action) => {
            state.loading = true;
        })

        .addCase(LoginSlice.fulfilled, (state, action) => {
            (state.user = action.payload), (state.loading = false);
            state.error = "";
        })

        .addCase(LoginSlice.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    },
});

export const { setUser, LogOut } = UserSlice.actions;

export default UserSlice.reducer;