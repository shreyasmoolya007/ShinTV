import {
    configureStore,
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit"
import { SHIN_BASE_URL } from "../utils/constants";
import axios from "axios";

const initialState = {
    animes: [],
    genresLoaded: false,
    genres: [],
};

export const getGenres = createAsyncThunk("shintv/genres", async() => {
    const {data:{genres}} = await axios.get(
        `${SHIN_BASE_URL}/home`
    );
    return genres;
});

export const getMovies = createAsyncThunk("shintv/movies", async() => {
    const {data:{animes}} = await axios.get(
        `${SHIN_BASE_URL}/movie`
    );
    return animes;
});

const ShinTVSlice = createSlice({
    name: "ShinTV",
    initialState,
    extraReducers:(builder) => {
        builder.addCase(getGenres.fulfilled,(state,action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });
    },
});

export const store = configureStore({
    reducer: {
        shintv: ShinTVSlice.reducer,
    }
});