import express from "express";
import Queue from "./queue.model.js";

const router = express.Router();

// Get all users in the queue
router.get("/", async (req, res) => {
    try {
        const queue = await Queue.find().sort({ position: 1 });
        res.json(queue);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Add a user to the queue
router.post("/", async (req, res) => {
    const { user } = req.body;
    try {
        // Get the latest position in the queue
        const lastInQueue = await Queue.findOne().sort({ position: -1 });
        const newPosition = lastInQueue ? lastInQueue.position + 1 : 1;

        const newQueueEntry = new Queue({
            user,
            position: newPosition,
        });

        await newQueueEntry.save();
        res.status(201).json(newQueueEntry);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Update a queue entry's status
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const queueItem = await Queue.findByIdAndUpdate(id, { status }, { new: true });
        if (!queueItem) {
            return res.status(404).json({ error: "Queue entry not found" });
        }
        res.json(queueItem);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Remove a user from the queue
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const removedQueueEntry = await Queue.findByIdAndDelete(id);
        if (!removedQueueEntry) {
            return res.status(404).json({ error: "Queue entry not found" });
        }
        res.json({ message: "User removed from queue" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
