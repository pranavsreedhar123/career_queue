import mongoose from 'mongoose';
import Student from './student_model.js';
import Company from './company_model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
mongoose.connect('mongodb+srv://sharada:Fmo01dDtNLPUViox@careerqueuecluster0.tuz6h.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("Error connecting to MongoDB:", err));

// Populate Students
const populateStudents = async () => {
    try {
        // Read and parse the students.json file
        const studentsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'students.json'), 'utf-8'));
        // Insert data into the Student collection
        await Student.insertMany(studentsData);
        console.log("Students populated successfully");
    } catch (err) {
        console.error("Error populating students:", err);
    }
};

// Populate Companies
const populateCompanies = async () => {
    try {
        // Read and parse the companies.json file
        const companiesData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'companies.json'), 'utf-8'));
        // Insert data into the Company collection
        await Company.insertMany(companiesData);
        console.log("Companies populated successfully");
    } catch (err) {
        console.error("Error populating companies:", err);
    }
};

// Call the population functions and then disconnect from the database
populateStudents()
    .then(() => populateCompanies())
    .then(() => mongoose.disconnect());
