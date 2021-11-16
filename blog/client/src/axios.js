import axios from "axios";

const Axios =  axios.create({
    // baseURL: "https://food-app-backend-mern.herokuapp.com/"
    baseURL: "http://localhost:4000/"
});

export default Axios;

