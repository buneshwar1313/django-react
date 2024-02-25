import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST, defaultHeaders } from "@/configs/https";
import { Title } from "chart.js";


const initialState = {
    moviesdata: null,
    generlist : null,
    filterdata : null,
};

export const moviesstore = createSlice({
    name: "moviesstore",
    initialState,
    reducers: {
        getMovies: (state, action) => {
            state.moviesdata = action.payload;
        },
        getGener: (state, action) => {
            state.generlist = action.payload;
        },
        getFilter: (state, action) => {
            state.filterdata = action.payload;
        }
    }
})


export const getMoviesData = (setLoader) => async (dispatch) => {
    const localHeader = {
    //   Authorization: `Token ${token}`,
    };
    try {
        setLoader(true)
        const res = await axios({
            method: "GET",
            url: API_HOST + `/movie/movie_dashboard/`,
            headers: localHeader,
        });
        console.log("response",res?.data?.data)
        dispatch(getMovies(res?.data?.data));
        setLoader(false)
    } catch (error) {
        console.log("Not getting Response From api", error);
    }
};


export const getGenerData = (setLoader) => async (dispatch) => {
    const localHeader = {
    //   Authorization: `Token ${token}`,
    };
    try {
        setLoader(true)
        const res = await axios({
            method: "GET",
            url: API_HOST + `/movie/genre/`,
            headers: localHeader,
        });
        console.log("response",res)
        dispatch(getGener(res?.data));
        setLoader(false)
    } catch (error) {
        console.log("Not getting Response From api", error);
    }
};



export const getFilterData = (setLoader,title,geners) => async (dispatch) => {
    const localHeader = {
    //   Authorization: `Token ${token}`,
    };
    console.log("title",geners,title)
    try {
        setLoader(true)
        const res = await axios({
            method: "GET",
            url: API_HOST + `/movie/movie_dashboard/?geners=${geners}&title=${title}`,
            headers: localHeader,
        });
        console.log("response",res?.data?.data)
        dispatch(getFilter(res?.data?.data));
        setLoader(false)
    } catch (error) {
        console.log("Not getting Response From api", error);
    }
};

export const {
   getMovies,
   getGener,
   getFilter,
  } = moviesstore.actions;
  
export const getMovieSelector = (state) => state.moviesstore.moviesdata;
export const getGenerSelector = (state) => state.moviesstore.generlist;
export const getFilterSelector = (state) => state.moviesstore.filterdata;
export default moviesstore.reducer;
