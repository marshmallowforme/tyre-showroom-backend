const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Midleware
app.use(express.json());
app.use(require("cors")());

//Test Route
app.get("/",(req, res) => {res.send("Tyre Showroom API is Running...");

});

app.listen(PORT, () => console.log('Server Running on port ${PORT}'));