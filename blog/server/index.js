require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(require('./routes'));

//Connect to database
const url = `${process.env.URL}`;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port ,() => {
        console.log(`server is running on port ${port}`);
    })
}).catch(err => {
    console.log(err.message);
});

mongoose.set('useFindAndModify', false);


