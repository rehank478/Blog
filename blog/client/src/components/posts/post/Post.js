import classes from "./Post.module.css";
import { useHistory } from "react-router-dom";

const Post = (props) => {
    const history = useHistory();

    const postClickHandler = () => {
        history.push('posts/' + props.post.path);
    }


    return(
        <div className={classes.container}>
            <h1 onClick={postClickHandler}>{props.post.title}</h1>
            <p>{props.post.body.substring(0,250)}...</p>
            <div className={classes.footer}>
                <h3>Created by: {props.post.author}</h3>
            </div>
        </div>
    );
}

export default Post;