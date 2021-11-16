import { useState } from "react";
import Login from "./login/Login";
import Register from "./register/Register";
import classes from "./Sign.module.css";

const Sign = () => {
    const[showLogin,setShowLogin] = useState(true);
    const onSignChange = (data) => {
        setShowLogin(data);
    }
    return (
        <div className={classes.container}>
            {!showLogin && <Register onSignChange={onSignChange} />}
            {showLogin && <Login onSignChange={onSignChange} />}
            
        </div>
    );
}

export default Sign;