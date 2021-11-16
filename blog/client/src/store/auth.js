import {createSlice} from "@reduxjs/toolkit";
import Axios from "../axios";

const initialState = {
    isVerify:  false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state){
            state.isVerify = true;
        },
        logout(state){
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            state.isVerify = false;
        }
    }  
});

export const isAuthorised = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        Axios.get('check',  {
            headers: {
                token: token,
                email: email
            }
        }).then(response => {
            if(response.data.error === undefined) dispatch(authActions.login());
        }).catch(err => {
            console.log(err);
        });
    }
} 

export const authActions = authSlice.actions;

export default authSlice.reducer;