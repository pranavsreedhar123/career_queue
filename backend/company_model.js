import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    queue: [{
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
    }],
});

const Company = mongoose.model("Company", companySchema);
export default Company;
