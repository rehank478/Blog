import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import './App.css';
import Header from './components/header/Header';
import CreatePost from './components/posts/createPost/CreatePost';
import Fullpost from './components/posts/fullPost/FullPost';
import Posts from './components/posts/Posts';
import Sign from './components/sign/Sign';
import { isAuthorised } from './store/auth';
import { fetchPosts } from './store/postSlice';
import Profile from './components/profile/Profile';

function App() {
  const dispatch = useDispatch();
  const havePosts = useSelector(state => state.post.havePosts);
  useEffect(() => {
    async function check (){
      await dispatch(isAuthorised());
    }
    check();
  }, [dispatch]);

  useEffect(() => {
    if(!havePosts){
      dispatch(fetchPosts());
    }
  }, [dispatch, havePosts])

  


  return (
    <div className="App">
          <Header />
          <Switch>
            <Route exact path='/'>
              <Posts />
            </Route>
            <Route exact path='/sign'>
              <Sign />
            </Route>
            <Route exact path='/posts/:id' render={(props) => <Fullpost {...props}/>}/>
            <Route exact path='/createPost'>
              <CreatePost />
            </Route>
            <Route exact path='/profile/:id' render={(props) => <Profile {...props}/>}/>
          </Switch>
    </div>
  );
}

export default App;
