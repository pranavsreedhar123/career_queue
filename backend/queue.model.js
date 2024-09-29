import mongoose from "mongoose";

const queueSchema = new mongoose.Schema({
    user: {
        type: String,  // or ObjectId if linked to a user collection
        required: true,
    },
    position: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["waiting", "served"],
        default: "waiting",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Queue = mongoose.model("Queue", queueSchema);
export default Queue;
