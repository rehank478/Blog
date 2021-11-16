import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import user from "../../assets/user.png";
import { authActions } from "../../store/auth";
import classes from "./Header.module.css";


const Header = () => {
    const [isHamClicked, setIsHamClicked] = useState(false);
    const isVerify = useSelector(state => state.auth.isVerify);
    const dispatch = useDispatch();
    const history = useHistory();
    // console.log(isVerify);
    const hamClickHandler = () => {
        setIsHamClicked(!isHamClicked);
    }

    const logOutHandler = () => {
        dispatch(authActions.logout());
        history.push('/');
    }

    const profileClickHandler = () => {
        var x = localStorage.getItem('email');
        history.push(`profile/${x}`);
    }


    return (
        <div className={classes.mainContainer}>
            <div className={classes.container}>
                <div className={classes.logo}>
                    <h1>BLOG</h1> 
                </div>
                <div className={classes.links}>
                    <Link onClick={() => {history.push('/')}} to='/' className={classes.link}>Home</Link>
                    <Link onClick={() => {history.push('/about')}} to='/about' className={classes.link}>About Us</Link>
                    <Link onClick={() => {history.push('/contact')}} to='contact' className={classes.link}>Contact Us</Link>
                    {!isVerify && <Link onClick={() => {history.push('/sign')}} to='sign' className={classes.link}>Login/Register</Link>}
                    {isVerify && 
                        <div className={classes.profile}>
                            <img src={user} alt="down" />
                            <div className={classes.dropdown}>
                                <Link onClick={profileClickHandler} to={`/profile/${localStorage.getItem('email')}`} className={classes.dropdown_content}>Profile</Link>
                                <Link onClick={logOutHandler} to='/' className={classes.dropdown_content}>Logout</Link>
                            </div>
                        </div>
                    }
                </div>
                <div className={classes.hamburger}  onClick={hamClickHandler}>
                    <span className={classes.bar}></span>
                    <span className={classes.bar}></span>
                    <span className={classes.bar}></span>
                </div>
            </div>
            <div className={`${isHamClicked ? classes.ham : classes.hide}`} >
                <div className={classes.hamDiv}><Link onClick={() => {history.push('/')}} to='/' className={classes.hamLink}>Home</Link></div>
                <div className={classes.hamDiv}><Link onClick={() => {history.push('/about')}} to='/about' className={classes.hamLink}>About Us</Link></div>
                <div className={classes.hamDiv}><Link onClick={() => {history.push('/contact')}} to='/contact' className={classes.hamLink}>Contact Us</Link></div>
                {!isVerify && <div className={classes.hamDiv}><Link onClick={() => {history.push('/sign')}} to='/sign' className={classes.hamLink}>Login/Register</Link></div>}
                {isVerify && <div className={classes.hamDiv}><Link onClick={profileClickHandler} to={`/profile/${localStorage.getItem('email')}`} className={classes.hamLink}>Profile</Link></div>}
                {isVerify && <div className={classes.hamDiv}><Link onClick={logOutHandler} to='/' className={classes.hamLink}>Logout</Link></div>}
            </div>
        </div>
    );
}

export default Header;