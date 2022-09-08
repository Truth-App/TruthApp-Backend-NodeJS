require('dotenv').config();
const express = require("express");
const app =express();
const PORT = process.env.PORT||3000;

//configs
app.use(express.json());
require("./configs/db");

//routes
app.use("/api",require("./routes/indexRoutes"))

app.listen(PORT,(error)=>{
    if(error)
    console.log(error);
    else
    console.log(`Server started at port ${PORT}`);
})