import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    graduationYear: {
        type: Number,
        required: true,
    },
    skills: {
        type: [String],
    },
    resume: {
        type: String,
    },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
