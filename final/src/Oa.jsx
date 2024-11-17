import React,{useState} from "react";
import Pie from "./Pie.jsx";
import BarChart from "./Bar.jsx";
function Oa({total,onClick,text}){
    const dict=[
        {
            label:"angry",
            score:0
        },
        {
            label:"sad",
            score:0
        },
        {
            label:"happy",
            score:0
        },
        {
            label:"surprise",
            score:0
        },
        {
            label:"fear",
            score:0
        },
        {
            label:"neutral",
            score:0
        },
        {
            label:"disgust",
            score:0
        }
    ]
    const emot=total.Emotions;
    const len=emot.length;
    const labels=[];
    const dataPoints=[];
    let date=new Date();
    date.setHours(0,0,0,0);
    date.setMinutes(date.getMinutes()+10);
    for(let i=0;i<len;i++){
        let TimeString=date.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
        labels.push(TimeString);
        date.setMinutes(date.getMinutes()+10);
    }
    emot.map((element)=>{
        let temp=dict.findIndex(item=>item.label===element[0].label);
        dict[temp].score+=element[0].score;
        dataPoints.push(element[0].score);
        // element.map((elem)=>{
        //     let temp=dict.findIndex(item=>item.label===elem.label);
        //     dict[temp].score+=elem.score;
        // });
    })
    const [ch,setCh]=useState({
        dis:"block",
        bas:"100%"
    })
    const [barshow,setBarshow]=useState(false);
    const [but,setBut]=useState("Detailed Analysis");
    function change2(){
        setCh((prevCh)=>{
            if (text==="Brief Analysis"){
                return {dis:"inline-flex",bas:"100%"};
            }else if(text==="Detailed Analysis"){
                return {dis:"flex",bas:"50%"};
            }
            return prevCh;
        })
        setBut((prevBut)=>(prevBut==="Detailed Analysis"? "Brief Analysis":"Detailed Analysis"));
        if(text==="Detailed Analysis"){
            setTimeout(()=>setBarshow(true),300);
        }else{
            setBarshow(false);
        }
    }

    return(
        <div className="Flexov" style={{display:ch.dis}}>
        <div>
        <Pie emotions={dict} style={{flexBasis:ch.bas}}/>
        <button onClick={()=>{
            onClick();
            change2();
        }}>{but}</button>
        </div>
        {barshow && <div className="App" style={{flexBasis:ch.bas}}>
            <h1>React Bar Chart Example</h1>
            <BarChart labels={labels} dataPoints={dataPoints} />
        </div>}
        </div>)
}
export default Oa;