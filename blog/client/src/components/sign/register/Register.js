import { useState } from "react";
import Axios from "../../../axios";
import classes from "./Register.module.css";
import queryString from "query-string";



const Register = (props) => {
    const [formData,setFormData] = useState({
        firstName: '',
        lastName: '',
        email:'',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const registerLinkClickHandler = () => {
        props.onSignChange(true);
    }

    const emailChangeHandler = (event) => {
        setFormData((prev) => {
            return {...prev, email:event.target.value};
        })
    }

    const firstNameChangeHandler = (event) => {
        setFormData((prev) => {
            return {...prev, firstName:event.target.value};
        })
    }

    const lastNameChangeHandler = (event) => {
        setFormData((prev) => {
            return {...prev, lastName:event.target.value};
        })
    }

    const passwordChangeHandler = (event) => {
        setFormData((prev) => {
            return {...prev, password:event.target.value};
        })
    }

    const confirmPasswordChangeHandler = (event) => {
        setFormData((prev) => {
            return {...prev, confirmPassword:event.target.value};
        })
    }

    const formSubmissionHandler = (event) => {
        setSuccess(false);
        event.preventDefault();
        setError(null);
        if(formData.firstName.length === 0){
            setError('First Name should not be empty');
            return;
        }
        if(formData.lastName.length === 0){
            setError('Last Name should not be empty');
            return;
        }
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
        if(formData.password !== formData.confirmPassword){
            setError('Password not matched');
            return;
        }
        const data = {
            name: formData.firstName + " " + formData.lastName,
            email: formData.email,
            password: formData.password
        }
        Axios.post('register', queryString.stringify(data)).then(response => {
            // console.log(response.data);
            if(response.data.id !== undefined) setSuccess(true);
            else{
                setError(response.data);
                return;
            }
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        }).catch(err => {
            console.log(err.message);
        })
    }


    return (
        <form className={classes.Form}>
            <div className={classes.heading}>
                <h1>Register Form</h1>
                {error && <p>{error}</p>}
                {success && <p>User created Successfully</p>}
            </div>
            <div className={classes.name}>
                <input onChange={firstNameChangeHandler} name="firstName" value={formData.firstName} type='text' style={{width:'100%', height: '40px'}} placeholder='First Name'/>
                <input onChange={lastNameChangeHandler} name="lastName" value={formData.lastName} type='text' style={{width:'100%', height: '40px'}} placeholder='Last Name'/>
            </div>
            <div className={classes.name}><input onChange={emailChangeHandler} name="email" value={formData.email} type='email' style={{width:'100%', height: '40px'}} placeholder='Email'/></div>
            
            <div className={classes.name}>
                <input onChange={passwordChangeHandler} name="password" value={formData.password} type='password' style={{width:'100%', height: '40px'}} placeholder='Password'/>
                <input onChange={confirmPasswordChangeHandler} name="confirmPassword" value={formData.confirmPassword} style={{width:'100%', height: '40px'}} placeholder='Confirm Password'/>
            </div>
            <button onClick={formSubmissionHandler}>Submit</button>
            <h3 onClick={registerLinkClickHandler}>Login</h3>
        </form>
    );
}

export default Register;