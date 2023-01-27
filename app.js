const db = require('./src/db/conn');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const userRouter = require("./src/router/user.router")
app.use("/user",userRouter)
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`server is running in ${PORT}`);
})