import classes from "./Login.module.css";
import view from "../../../assets/view.png";
import { useState } from "react";
import Axios from "../../../axios";
import queryString from "query-string";
import {Redirect} from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth";


const Login = (props) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const dispatch = useDispatch();
    const [success,setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const loginLinkClickHandler = () => {
        props.onSignChange(false);
    }

    const showPasswordClickHandler = () => {
        setShowPassword(!showPassword);
    }

    const emailChangeHandler = (event) => {
        setFormData({...formData, email:event.target.value});
    }

    const passwordChangeHandler = (event) => {
        setFormData({...formData, password:event.target.value});
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault();
        setSuccess(false);
        setError(null);
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formData.email))
        {
                //
        }else{
            setError('Email is not valid');
            return;
        }
        if(formData.password.length < 6){
            setError('Password should be of length 6');
            return;
        }
        Axios.post("login", queryString.stringify(formData)).then(response => {
            if(response.data.token === undefined){
                setError(response.data);
                return;
            }else{
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', response.data.email);
                dispatch(authActions.login());
                setSuccess(true);
            }
        }).catch(err => {
            console.log(err);
        })
    }
    

    return (
        <form className={classes.Form}>
            <div className={classes.heading}>
                <h1>Login Form</h1>
                {error && <p>{error}</p>}
                {success && <Redirect to="/" />}
            </div>
            <div className={classes.name}><input onChange={emailChangeHandler} value={formData.email} name='email' type='email' style={{width:'100%', height: '40px'}} placeholder='Email'/></div>
            
            <div className={classes.name}>
                <input onChange={passwordChangeHandler} value={formData.password} name='password' type={showPassword ? 'text' : 'password'} style={{width:'100%', height: '40px'}} placeholder='Password'/>
                <img onClick={showPasswordClickHandler} src={view} alt="show Password" />
            </div>
            <button onClick={formSubmissionHandler}>Submit</button>
            <h3 onClick={loginLinkClickHandler}>Register</h3>
        </form>
    );
}

export default Login;