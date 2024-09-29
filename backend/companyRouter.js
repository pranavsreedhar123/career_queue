import express from "express";
import Company from "./company_model.js";

const router = express.Router();

// Add a company
router.post("/", async (req, res) => {
    try {
        const newCompany = new Company(req.body);
        await newCompany.save();
        res.status(201).json(newCompany);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get all companies
router.get("/", async (req, res) => {
    try {
        const companies = await Company.find().populate('queue.studentId');
        res.json(companies);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
