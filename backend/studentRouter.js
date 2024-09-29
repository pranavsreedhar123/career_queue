import express from "express";
import Student from "./student_model.js";

const router = express.Router();

// Add a student
router.post("/", async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
