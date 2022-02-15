import React, { useReducer, useState } from "react";
import axios from 'axios'
const ShowContext = React.createContext();

const ShowState = (props) => {
    const initialState = {
        shows: [],
        activeShow: {},
        loading: false
    }

    const serachShows = async (searchTerm) => {
        dispatch({ type: "SET_LOADING" })
        const { data } = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
        console.log(data)
        dispatch({ type: "SEARCH_SHOWS", payload: data })
    }

    //useReducer is usually preferable to useState
    const [state, dispatch] = useReducer(ShowReducer, initialState);
    //dispatch it's Briefly what you give you take give string return string give object return object
    // const changeTitle = () => dispatch({ type: 'CHANGE' })
    const getActiveShow = async (id) => {
        dispatch({ type: "SET_LOADING" })
        const { data } = await axios.get(`https://api.tvmaze.com/shows/${id}`)
        console.log(data)
        dispatch({ type: 'SET_ACTIVE_SHOW', payload: data })
    }
    return <ShowContext.Provider value={{
        shows: state.shows,
        loading: state.loading,
        activeShow:state.activeShow,
        search: serachShows,
        getActiveShow: getActiveShow
    }}>
        {props.children}
    </ShowContext.Provider>
}
const ShowReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: true };
        case 'SEARCH_SHOWS':
            return { ...state, shows: action.payload, loading: false }
        case 'SET_ACTIVE_SHOW':
            return { ...state, activeShow: action.payload ? action.payload : {}, loading: false }
        default:
            return state;
    }
}
export { ShowContext, ShowState };
