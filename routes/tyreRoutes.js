const express = require("express");
const router = express.Router();
const Tyre = require("../models/Tyre");

// Add a new tyre
router.post("/add", async (req, res) => {
    try {
        const tyre = new Tyre(req.body);
        await tyre.save();
        res.status(201).json({ message: "Tyre added successfully", tyre });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all tyres
router.get("/", async (req, res) => {
    try {
        const tyres = await Tyre.find();
        res.json(tyres);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
