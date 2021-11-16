import { useEffect, useState } from "react";
import Axios from "../../axios";
import classes from "./Profile.module.css";
import queryString from "query-string";
import {Link} from "react-router-dom";
import bin from "../../assets/bin.png"
import { useDispatch } from "react-redux";
import { postActions } from "../../store/postSlice";
import CreatePost from "../posts/createPost/CreatePost";

const Profile = (props) => {
    const [userData,setUserData] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [editClicked, setEditClicked] = useState(false);
    const [editData, setEdiData] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        Axios.post('profile', queryString.stringify({email: props.match.params.id})).then(response => {
            setError(null);
            if(response.data.error !== undefined) setError(response.data.error);
            else{
                setUserData(response.data.user);
                setUserPosts(response.data.posts);
            }
        }).catch(err => {
            console.log(err);
        })
    }, [props.match.params.id]);

    const postDeleteHandler = (event, data) => {
        event.preventDefault();
        setSuccess(null);
        Axios.delete('post', {
            headers:{
                id: data
            }
        }).then(response => {
            // console.log(response);
            const temp = userPosts.filter(post => post.path !== data);
            setUserPosts(temp);
            dispatch(postActions.deletePost({path: data}));
            setSuccess(response.data.message);
        }).catch(err => {
            console.log(err);
        });
    }

    const editClickedHandler = (event,data) => {
        setEditClicked(true);
        setEdiData(data);
    }

    return (
        <div className={classes.container}>
            {error && <h3>{error}</h3>}
            {error == null && 
                <div>
                    <h3>Name: {userData.name}</h3>
            <h3>Email: {userData.email}</h3>
            <h3>Number of Posts: {userPosts.length}</h3>
            <div>
                <h1>Posts</h1>
                {success && <h3>{success}</h3>}
            {   
                userPosts.map((post,index) => {
                    return <div key={post.path} className={classes.post_link}> 
                            <Link className={classes.Link} to={`/posts/${post.path}`}>{index+1}. {post.title}</Link>
                            {localStorage.getItem('email') === post.author && <div className={classes.actions}>
                                <h2 onClick={(event) => editClickedHandler(event,post)}>Edit</h2>
                                <img onClick={(event) => postDeleteHandler(event,post.path)} src={bin} alt="delete" />
                                
                            </div>}
                        </div>
                })
            }
            </div>
            {editClicked && <CreatePost update postData={editData} />}
                </div>
            }
        </div>
    );
}

export default Profile;