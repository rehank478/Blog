import Post from "./post/Post";
import classes from "./Posts.module.css";
import write from "../../assets/write.png";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";



const Posts = () => {
    const [postsData, setPostsData] = useState([]);
    const havePosts = useSelector(state => state.post.havePosts);
    const data = useSelector(state => state.post.posts);
    useEffect(() => {
        if(havePosts){
            setPostsData(data);
        }
    }, [havePosts, data]);

    // console.log(postsData);
    const history = useHistory();
    return(
        <div className={classes.container}>
            <div onClick={() => {history.push('/createPost')}} className={classes.createPost}>
                <img src={write} alt="write" />
                <h3>Write a Post</h3>
            </div>
            {
                postsData.map(post => {
                    return <Post key={post.path} post={post}/>
                })
            }
        </div>
    );
}

export default Posts;