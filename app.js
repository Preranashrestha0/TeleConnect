const express = require('express');
const connectDB = require('./src/config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./src/Routes/authRoutes');
const doctorRoutes = require('./src/Routes/doctorRoutes');
const patientRoutes = require('./src/Routes/patientRoutes');
const messageRoutes = require('./src/Routes/messageRoutes');
const appointmentRoutes = require('./src/Routes/appointmentRoutes');
const prescriptionRoutes = require('./src/Routes/prescriptionRoutes');
const reviewRoutes = require('./src/Routes/reviewRoutes');



// Initialize Express
const app = express();
const port = 5000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); 
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(__dirname + "/uploads"));

// Routes
app.use('/api/auth/', authRoutes);
app.use('/api/doctor', doctorRoutes); 
app.use('/api/patient', patientRoutes); 
app.use('/api/messages', messageRoutes); 
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/reviews', reviewRoutes);



app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})