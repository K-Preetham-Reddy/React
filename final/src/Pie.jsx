import React from "react";
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
function Pie({emotions}){
    const arr1=[]
    const arr2=[]
    const arr3=[]
    {emotions.map((data,index)=>{
        arr1.push(data.label);
        arr2.push(data.score);
        if (data.label==="angry"){
            arr3.push("red");
        }
        else if(data.label==="sad"){
            arr3.push("blue");
        }
        else if(data.label==="happy"){
            arr3.push("#2bca4e");
        }
        else if(data.label==="surprise"){
            arr3.push("yellow");
        }
        else if(data.label==="fear"){
            arr3.push("orange");
        }
        else if(data.label==="neutral"){
            arr3.push("grey");
        }
        else if(data.label==="disgust"){
          arr3.push("green")
        }
    })}
    let total = arr2.map((sum,element)=>{ return sum+element});
    if (total<0){
      arr1.push("others");
      arr2.push(1-total);
    }
    arr3.push("black");
    const data = {
      labels: arr1,
      datasets: [
        {
          data: arr2, 
          backgroundColor: arr3,
          hoverBackgroundColor: arr3,
        },
      ],
    };
  
    const options = {
      cutout: '50%',
      responsive: true,
      plugins: {
        position:"top",
      },
    };
  
    return <Doughnut data={data} options={options}/>;
  };
  
  export default Pie;