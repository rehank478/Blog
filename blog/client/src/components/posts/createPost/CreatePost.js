import classes from "./CreatePost.module.css";
import {useEffect, useState} from "react";
import Axios from "../../../axios";
import queryString from "query-string";
import {Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, postActions } from "../../../store/postSlice";

const CreatePost = (props) => {
    const isVerify = useSelector(state => state.auth.isVerify);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        body: ''
    });

    useEffect(() => {
        if(props.update !== undefined){
            setFormData({
                title: props.postData.title,
                body: props.postData.body
            });
        }
    },[props.update, props.postData])

    const titleChangeHandler = (event) => {
        setFormData((prev) => {
            return {...prev, title: event.target.value};
        });
    }

    const bodyChangeHandler = (event) => {
        setFormData((prev) => {
            return {...prev, body: event.target.value};
        });
    }
    const data = {
        title: formData.title,
        body: formData.body,
        author: localStorage.getItem('email')
    }
    const formSubmissionhandler = (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);
        Axios.post('post', queryString.stringify(data)).then(response => {
            if(response.data.message !== undefined){
                setSuccess(response.data.message);
                dispatch(fetchPosts());
            }else{
                setError(response.data.error);
            }
        }).catch(err => {
            setError(err.data.error);
        });
        setFormData({
            title: '',
            body: ''
        })
    }

    const postEditHandler = (event) => {
        event.preventDefault();
        setSuccess(null);
        const data = {
            id : props.postData.path,
            body: formData.body
        };
        Axios.put('post', queryString.stringify(data)).then(response => {
            // console.log(response);
            dispatch(postActions.updatePost(data));
            setSuccess(response.data.message)
        }).catch(err => {
            console.log(err);
        });
    }

    let content = <h3>Please Login to create Post <Link onClick={() => {history.push('sign')}} to="/sign">Click Here</Link></h3>;

    if(isVerify){
        content = (
            <form>
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}
                {props.update === undefined && <input onChange={titleChangeHandler} value={formData.title} name="title" placeholder="Title" />}
                <textarea onChange={bodyChangeHandler} value={formData.body} placeholder="write your post here"></textarea>
                {props.update === undefined && <button onClick={formSubmissionhandler}>Submit</button>}
                {props.update !== undefined && <button onClick={postEditHandler}>Update</button>}
            </form>
        );
    }


    return (
        <div className={classes.container}>
            {content}
        </div>
    );
}

export default CreatePost;