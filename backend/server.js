const express=require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

const app=express();

app.use(cors());
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI)
.then( () => console.log("Connected"))
.catch((err) => console.log(err));


app.listen(process.env.PORT,()=>{
    console.log('Server running on',process.env.PORT);
})