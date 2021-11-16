import classes from "./FullPost.module.css";
import {useEffect, useState} from "react";
import Axios from "../../../axios";
import queryString from "query-string";

const Fullpost = (props) => {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const data = {
            id: props.match.params.id
        }
        Axios.post('fullPost',queryString.stringify(data) ).then(response => {
            setPost(response.data.post);
            setLoading(false);
        }).catch(err => {
            console.log(err);
        });
    },[props.match.params.id]);


    return(
        <div className={classes.container}>
            {loading && <p>Loading.....</p>}
            {!loading && <div>
                    <h1>{post.title}</h1>
                    <p className={classes.para}>{post.body}</p>
                    <h3>Author: {post.author}</h3>
                </div>}
            
        </div>
    );
}

export default Fullpost;