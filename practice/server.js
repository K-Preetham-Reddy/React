import express from "express";
import cors from "cors";

const PORT=3002;
const app=express();
app.use(cors());
app.use(express.json());
app.post('/api/data',(req,res)=>{
    const {Username,Password}=req.body;
    console.log(`Username:${Username}, Password:${Password}`);
    res.status(200).send({message:`Received the data(Username and Password)`});
});
app.listen(PORT,()=>{
    console.log("Server is running on http://localhost:3002");
})