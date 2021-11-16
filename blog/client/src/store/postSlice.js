import { createSlice } from "@reduxjs/toolkit";
import Axios from "../axios";

const initialState = {
    posts: [],
    havePosts: false
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postFetched(state){
            state.havePosts = true;
        },
        setPosts(state,action){
            state.posts = action.payload;
        },
        deletePost(state, action){
            state.posts = state.posts.filter(post => post.path !== action.payload.path);
        },
        updatePost(state, action){
            // console.log(action.payload.id);
            const index = state.posts.findIndex(post => post.path === action.payload.id);
            // console.log("its me : ", state.posts[index].body);
            state.posts[index].body = action.payload.body;
            // console.log("its me : ", state.posts[index].body);
        }
    }
});

export const fetchPosts = () => {
    return (dispatch) => {
        Axios.get("post").then(response => {
            dispatch(postActions.setPosts(response.data.posts));
            dispatch(postActions.postFetched());
            
        }).catch(err => {
            console.log(err);
        })
    }
}

export const postActions = postSlice.actions;

export default  postSlice.reducer;