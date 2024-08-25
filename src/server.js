const express=require('express');
  const connectDB = require('./src/config/db');
  const app=express();
  const port=3000;
  
  connectDB();
  app.listen(port, ()=> {
      console.log(`Server is running on port ${port}`)
  })