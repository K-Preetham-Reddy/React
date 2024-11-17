import React,{useState,useEffect} from "react";
function App() {
  const server = async()=>{
    const data={"Username":"Preetham","Password":2907}
    const response= await fetch("http://localhost:3002/api/data",{
      method:"POST",
      headers:{
        'Content-Type':"application/json",
      },
      body:JSON.stringify(data),
    });
    const result= await response.json();
    console.log(result.message);
  }
  useEffect(()=>{
    server();
  },[]);
  return (
    <div>Data has been received</div>
  );
}

export default App;
