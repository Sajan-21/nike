const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const mongoConnect = require('../server/db/connect');
mongoConnect();

const productRouter = require('../server/router/productRouter');

console.log("server is running...");

app.use(express.static("../client"));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(productRouter);

app.listen(process.env.PORT, () => {
    console.log(`server running at http://localhost:${process.env.PORT}`);
})