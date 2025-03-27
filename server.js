require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Midleware
app.use(express.json());
app.use(require("cors")());

console.log("MongoDB URI:", process.env.MONGO_URI);

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {useNewUrlPraser: true, useUnifiedTopology: true,

}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

//Test Route
app.get("/",(req, res) => {res.send("Tyre Showroom API is Running...");

});

app.listen(PORT, () => console.log('Server Running on port ${PORT}'));
