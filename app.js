const express=require('express');

const connectDB = require('./src/config/db');
// from express
const app=express();
const port=5000;
const userRoutes =require('./src/Routes/usersRoutes')
const medicalRoutes =require('./src/Routes/medicalRoutes')
const messageRoutes =require('./src/Routes/messageRoutes')
const reviewRoutes =require('./src/Routes/reviewRoutes')
const profileRoutes =require('./src/Routes/profileRoutes')
const authRoutes = require('./src/Routes/authRoutes')


connectDB();
app.use(express.json()); 

// while user calls it auto call user profile routes
// Routes

app.use('/api/auth', authRoutes)
// app.use('/api', messageRoutes);
// app.use('/api', reviewRoutes);
// app.use('/api', medicalRoutes);
// app.use('/api', profileRoutes);
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})