import cors from 'cors';
import express from 'express';
import {MongoClient,ObjectId} from "mongodb";
import uri from "./atlas_uri.js";
import data from './output.json' assert {type: 'json'};
const client= new MongoClient(uri);
const dbname = "Analysis";
const student_collection="stu";
let stu;
let total;
let Username;
let Password;
let DATABASE;
const app=express();
const port=5000;
app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000',
}))

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log(`Connected to the ${dbname} database`);
        stu=client.db(dbname).collection(student_collection);


    } catch (err) {
        console.error(`Error connecting to the database: ${err}`);
        throw err;
    }
};
const login={
    "Username": "K.Preetham Reddy",
    "Password":2907
};
const array1={
    "Game_screenshots":["screenshot_17223525626265262.png",
        "screenshot_17223525626261111.png",
        "screenshot_17223525626262222.png",
        "screenshot_17223525626263333.png",
        "screenshot_17223525626264444.png", 
        "screenshot_17223525626265555.png",
        "screenshot_17223525626266666.png",
        "screenshot_17223525626267777.png",
        "screenshot_17223525626268888.png",
        "screenshot_17223525626269999.png",
        "screenshot_17223525626260000.png",
        "screenshot_17223525626261234.png",
        "screenshot_17223525626265678.png",
        "screenshot_17223525626260987.png",
        "screenshot_17223525626266543.png",
        "screenshot_17223525626265432.png",
        "screenshot_17223525626261029.png",
        "screenshot_17223525626264756.png"]
}
const array2={
    "Player_images":[]
}
const result1={
    "Emotions":[]
}
const TimeStamps={
    "Time_stamps":[]
}

const student=async()=>{
    try {
        await connectToDatabase();
        console.log("Connected to database successfully");
        console.log("Yup");
        console.log(data);

        for (let i=0;i<data.length;i++){
            array2.Player_images.push(data[i].image);
            result1.Emotions.push(data[i].result);
        }
        console.log(array2.Player_images);
        console.log(result1.Emotions);
        let date=new Date();
        date.setHours(0,0,0,0);
        date.setMinutes(date.getMinutes()+10);
        for(let i=0;i<data.length;i++){
            let TimeString=date.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
            TimeStamps.Time_stamps.push(TimeString);
            date.setMinutes(date.getMinutes()+10);
        }
        let RecentDocument=await stu.findOne({},{sort:{_id:-1}});
        let Se_Id;
        if(!RecentDocument){
            Se_Id=0;
        }
        else{
            let Prev_Id=RecentDocument.Session_Id;
            Se_Id=Prev_Id+1;
        }
        login.Session_Id=Se_Id;
        login.Time_stamps=TimeStamps.Time_stamps;
        login.Emotions=result1.Emotions;
        login.Player_images=array2.Player_images;
        login.Game_screenshots=array1.Game_screenshots;
        console.log(login);
        let final_result=stu.insertOne(login);
        console.log("The document has been successfully inserted into the collection");
        DATABASE=await stu.find({},{sort:{Session_Id:-1}}).toArray();
        console.log(DATABASE);
    }catch(err){
        console.log(`Found Error:${err}`);
        throw err;
    }
};



await student();

app.get('/api/data',async(req,res)=>{
    try{
        if(!DATABASE){
            await student();
        }
        res.json(DATABASE);
    }catch(err){
        res.status(500).send({message: `Error retrieving data: ${err}`});
    }
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
//Part 1
// import { MongoClient } from "mongodb";
// import express from 'express';
// import uri from "./atlas_uri.js";
// import data from './output.json' assert {type: 'json'};

// const re = express();
// const port = 3000;
// const client = new MongoClient(uri);
// const dbname = "Analysis";
// const student_collection = "stu";
// let stu;

// re.use(express.json());

// const connectToDatabase = async () => {
//     try {
//         await client.connect();
//         console.log(`Connected to the ${dbname} database`);
//         stu = client.db(dbname).collection(student_collection);
//     } catch (err) {
//         console.error(`Error connecting to the database: ${err}`);
//         throw err;
//     }
// };

// const array1 = {
//     "Game_screenshots": [
//         "screenshot_17223525626265262.png",
//         "screenshot_17223525626261111.png",
//          "screenshot_17223525626262222.png",
//          "screenshot_17223525626263333.png",
//          "screenshot_17223525626264444.png", 
//          "screenshot_17223525626265555.png",
//          "screenshot_17223525626266666.png",
//          "screenshot_17223525626267777.png",
//          "screenshot_17223525626268888.png",
//          "screenshot_17223525626269999.png",
//          "screenshot_17223525626260000.png",
//          "screenshot_17223525626261234.png",
//          "screenshot_17223525626265678.png",
//          "screenshot_17223525626260987.png",
//          "screenshot_17223525626266543.png",
//          "screenshot_17223525626265432.png",
//          "screenshot_17223525626261029.png",
//          "screenshot_17223525626264756.png"]
        
// };
// const array2 = {
//     "Player_images": []
// };
// const result1 = {
//     "Emotions": []
// };
// const TimeStamps = {
//     "Time_stamps": []
// };
// const login={
//     "Username":"Red John",
//     "Password":1234
// }

// re.post('/jack', async (req, res) => {
//     const { Username, Password } = req.body;
//     if (!Username || !Password) {
//         return res.status(400).json({ error: "Username and Password are required" });
//     }
    
//     try {
//         await connectToDatabase();
        
//         await student(Username, Password);
        
//         res.status(200).json({ message: 'Data has been received and inserted successfully' });
//         console.log(`Username: ${Username}, Password: ${Password}`);
//     } catch (err) {
//         res.status(500).json({ error: `Error occurred: ${err}` });
//     }
// });
// const student = async (Username, Password) => {
//     try {
//         console.log("Connected to database successfully");
//         console.log(data);
        
//         for (let i = 0; i < data.length; i++) {
//             array2.Player_images.push(data[i].image);
//             result1.Emotions.push(data[i].result);
//         }
        
//         let date = new Date();
//         date.setHours(0, 0, 0, 0);
//         for (let i = 0; i < data.length; i++) {
//             let TimeString = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
//             TimeStamps.Time_stamps.push(TimeString);
//             date.setMinutes(date.getMinutes() + 10);
//         }

//         let RecentDocument = await stu.findOne({}, { sort: { _id: -1 } });
//         let Se_Id = RecentDocument ? RecentDocument.Session_Id + 1 : 0;
//         let login = {
//             Username,
//             Password,
//             Session_Id: Se_Id,
//             Time_stamps: TimeStamps.Time_stamps,
//             Emotions: result1.Emotions,
//             Player_images: array2.Player_images,
//             Game_screenshots: array1.Game_screenshots
//         };
        
//         console.log(login);
    
//         await stu.insertOne(login);
//         console.log("The document has been successfully inserted into the collection");
        
//     } catch (err) {
//         console.log(`Found Error: ${err}`);
//         throw err;
//     }
// };


// re.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

//Part 2
// app.js
// import express from 'express';

//Part 3
// const app=express();
// const port=process.env.PORT || 3002;

//Part 4
// re.post('/login',async(req,res)=>{
//     const {Username,Password}=req.body;
//     if(!Username || !Password){
//         return res.status(400).json({error: "Username and Password are required"});
//     }
//     try{
//         await connectToDatabase();
//         login={
//             Username,
//             Password
//         }
//         res.status(200).json({message: 'Data has been recieved successfully'});
//         console.log(Username);
//         console.log(Password);
//     }catch(err){
//         res.status(500).json({error:`Error occurred: ${err}`})
//     }
    
// })
// re.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

// Part 5
// app.get('/get-data',async(req,res)=>{
//     try{
//         await connectToDatabase();
//         total=await stu.find({}).toArray();
//         res.statul(200).json(total);
//     }
//     catch(err){
//         res.status(500).json({error:`Error retrieving data: ${err}`});
//     }
// });
// app.listen(port,()=>{
//     console.log(`Server running on port ${port}`);
// });x4
























// import React,{useState} from "react";
// function App() {
//   const [data,setData]=useState({Name:"",Password:0,Age:0});
//   const handlesubmit=async(e)=>{
//     e.preventDefault();
//     try{
//       const response = await fetch("http://localhost:5000/studentinfo",{
//         method:"POST",
//         headers:{
//           'Content-Type':'application/json',
//         },
//         body:JSON.stringify(data)
//       })
//       const result= await response.json();
//       alert(result.message);
//     }catch(err){
//       console.error(`Error has been found: ${err}`);
//     }

//   }
//   function datachange(event){
//     const {name,value}=event.target;
//     setData(prevValue=>({
//       ...prevValue,
//       [name]:value,
//     }));
//   }
//   return (
//     <div>
//       <form onSubmit={handlesubmit}>
//         <input type="text" name="Name" onChange={datachange} placeholder="Name"></input>
//         <input type="text" name = "Password" onChange={datachange} placeholder="Password"></input>
//         <input type="text" name = "Age" onChange={datachange} placeholder="Age"></input>
//         <input type="submit"></input>
//       </form>

//     </div>
//   );
// }

// export default App;























// import cors from 'cors';
// import express from 'express';
// import { MongoClient, ObjectId } from "mongodb";
// import uri from "./atlas_uri.js";

// const client = new MongoClient(uri);
// const dbname = "Analysis"; 
// const student_collection = "stu"; 
// const app=express();
// const PORT=5000;
// app.use(cors());
// app.use(express.json());
// const Cluster = async()=>{
//     try{
//         await client.connect();
//         console.log("Node.js application has been successfully connected to the MongoDB cluster");
//         return client.db(dbname).collection(student_collection);
//     }catch(err){
//         console.error(`Error has been found: ${err}`);
//         throw err;
//     }
// }

// app.post('/studentinfo', async (req,res)=>{
//     try{
//         const stu1=await Cluster();
//         const data=req.body;
//         const doc=await stu1.insertOne(data);
//         res.status(200).send(`Data has been stored --docs _id--->${doc.insertedId}`);
//     }
//     catch(err){
//         res.status(500).send(`Error has been found: ${err}`);
//     }
// });
// app.listen(PORT,()=>{
//     console.log(`Server is running on http://localhost:${PORT}`);
// })











// const Operations = async()=>{
//     try{
//         const stu1=await Cluster();
//         const result1=await stu1.findOne({Session_Id:3});
//         if(result1){
//             const result=await stu1.findOne({Session_Id:3},{projection:{"Username":0}});
//         console.log(result);
//         }
//         else{
//             console.log("Didn't receive the result");
//         }
        
//     }catch(err){
//         console.error(`${err}-->Error has occured`);
//     }
// }
// await Operations();


// const app = express();
// const port = 5000;
// app.use(express.json());
// app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from your frontend

  
// await stu1.insertOne({
//     _id: new ObjectId('66fe425c512d0c450874440c'),
//     Username: 'Preetham',
//     Password: 1234,
//     Session_Id: 1,
//     Time_stamps: [
//       '00:10', '00:20', '00:30',
//       '00:40', '00:50', '01:00',
//       '01:10', '01:20', '01:30',
//       '01:40', '01:50', '02:00',
//       '02:10', '02:20', '02:30',
//       '02:40', '02:50', '03:00'
//     ],
//     Emotions: [
//       [Array], [Array], [Array],
//       [Array], [Array], [Array],
//       [Array], [Array], [Array],
//       [Array], [Array], [Array],
//       [Array], [Array], [Array],
//       [Array], [Array], [Array]
//     ],
//     Player_images: [
//       'screenshot_17223525626265262.png',
//       'screenshot_17223525626261111.png',
//       'screenshot_17223525626262222.png',
//       'screenshot_17223525626263333.png',
//       'screenshot_17223525626264444.png',
//       'screenshot_17223525626265555.png',
//       'screenshot_17223525626266666.png',
//       'screenshot_17223525626267777.png',
//       'screenshot_17223525626268888.png',
//       'screenshot_17223525626269999.png',
//       'screenshot_17223525626260000.png',
//       'screenshot_17223525626261234.png',
//       'screenshot_17223525626265678.png',
//       'screenshot_17223525626260987.png',
//       'screenshot_17223525626266543.png',
//       'screenshot_17223525626265432.png',
//       'screenshot_17223525626261029.png',
//       'screenshot_17223525626264756.png'
//     ],
//     Game_screenshots: [
//       'screenshot_17223525626265262.png',
//       'screenshot_17223525626261111.png',
//       'screenshot_17223525626262222.png',
//       'screenshot_17223525626263333.png',
//       'screenshot_17223525626264444.png',
//       'screenshot_17223525626265555.png',
//       'screenshot_17223525626266666.png',
//       'screenshot_17223525626267777.png',
//       'screenshot_17223525626268888.png',
//       'screenshot_17223525626269999.png',
//       'screenshot_17223525626260000.png',
//       'screenshot_17223525626261234.png',
//       'screenshot_17223525626265678.png',
//       'screenshot_17223525626260987.png',
//       'screenshot_17223525626266543.png',
//       'screenshot_17223525626265432.png',
//       'screenshot_17223525626261029.png',
//       'screenshot_17223525626264756.png'
//     ]
//   });

// const connectToDatabase = async () => {
//     try {
//         await client.connect();
//         console.log(`Connected to the ${dbname} database`);
//         return client.db(dbname).collection(student_collection);
//     } catch (err) {
//         console.error(`Error connecting to the database: ${err}`);
//         throw err;
//     }
// };


// app.post('/api/data', async (req, res) => {
//     const collection = await connectToDatabase();
//     const dataToInsert = req.body; // Assume data is sent in the request body
//     try {
//         const result = await collection.insertOne(dataToInsert);
//         res.status(201).json({ message: 'Document inserted', id: result.insertedId });
//     } catch (err) {
//         res.status(500).json({ message: `Error inserting data: ${err}` });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });