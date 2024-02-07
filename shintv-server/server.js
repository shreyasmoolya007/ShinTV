const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/UserRoutes");
const app = express();

app.use(cors());
app.use(cors({
    origin: (process.env.CLIENT_PORT),
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
    credentials: true,
  }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

app.use("/api/user", userRoutes);


app.get("/getSubtitle", async (req, res) => {
    const subtitleUrl = req.query.subtitleUrl;
    try {
      
      const response = await axios.get(subtitleUrl);
      res.setHeader('Content-Type', 'text/vtt');
      console.log("response",response.data);
      res.send(response.data);
    } catch (error) {
      console.error("Error fetching subtitle:", error.message);
      res.status(500).send("Internal Server Error");
    }
});

app.listen((process.env.PORT), () => {
  console.log(`Server started at port 4000`);
});
