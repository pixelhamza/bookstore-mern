require('dotenv').config();
const express=require('express'); 
const connectToDatabase=require('./database/database');
const bookRoutes=require('./routes/book-route');
const app=express(); 
const PORT=process.env.PORT; 

//connect to our database
connectToDatabase();

//middleware
app.use(express.json());

app.use('/api/books',bookRoutes);

app.listen(PORT,()=>{
    console.log("Server is now running");
})

