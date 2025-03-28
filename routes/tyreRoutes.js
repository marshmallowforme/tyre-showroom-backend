const express = require("express");
const authMiddleware = require("../middleware/authMiddleware"); // Import auth middleware
const Tyre = require("../models/Tyre"); // Assuming you have a Tyre model

const router = express.Router();

// Add a new tyre (Only for Admins)
router.post("/add", authMiddleware, async (req, res) => {
    try {
        // Ensure only admins can add tyres
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access Denied. Admins only." });
        }

        const { brand, model, price, size } = req.body;
        const tyre = new Tyre({ brand, model, price, size });
        await tyre.save();

        res.status(201).json({ message: "Tyre added successfully", tyre });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all tyres (Open for everyone)
router.get("/", async (req, res) => {
    try {
        const tyres = await Tyre.find();
        res.json(tyres);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get tyre by ID
router.get("/:id", async (req, res) => {
    try {
        const tyre = await Tyre.findById(req.params.id);
        if (!tyre) return res.status(404).json({ message: "Tyre not found" });

        res.json(tyre);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a tyre (Only for Admins)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access Denied. Admins only." });
        }

        const tyre = await Tyre.findByIdAndDelete(req.params.id);
        if (!tyre) return res.status(404).json({ message: "Tyre not found" });

        res.json({ message: "Tyre deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
