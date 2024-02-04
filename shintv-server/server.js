const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

app.listen(process.env.PORT, console.log(`Server started at port ${process.env.PORT}`));