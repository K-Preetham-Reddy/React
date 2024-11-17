import React,{useState} from "react";
import "./D1.css";
import { Doughnut } from 'react-chartjs-2';
import Pie from "./Pie.jsx";
function D1({data,onClick,text}){
    const pi=data.pi;
    const ts=data.ts;
    const gs=data.gs;
    const em=data.em;
    const [bu,setBu]=useState("Detailed Analysis");
    const [chan,setChan]=useState({
        dis:"block",
        l_align:"center",
        l_fb:"100%",
    });
    const [pieshow,setPieShow]=useState(false)
    function change(){
        if (text==="Detailed Analysis"){
            setChan({dis:"flex",l_align:"flex-start",l_fb:"50%",mar:"2vw",transi:"display 3s ease"});
            setBu("Brief Analysis");
            setTimeout(()=>{
                setPieShow(true);
            },300)
        }
        else if(text==="Brief Analysis"){
            setChan({dis:"block",l_align:"center",l_fb:"100%",mar:""});
            setPieShow(false);
            setBu("Detailed Analysis")
        }
    }
    return(
        <div className="Flex1" style={{display:chan.dis,transition:chan.transi}}>
    <div className="Flex2" style={{flexBasis:chan.l_fb}}>
        <div className="GS" style={{alignSelf:chan.l_align,marginLeft:chan.mar}}></div>
        {/* the above the block containing the game screenshot,
        the below is the image containing the image of the kid */}
        {/* Pranav--> Once you have figured out the paths, you need to set the background images of these blocks to be the images. */}
        
        <div className="PI" style={{alignSelf:chan.l_align,marginLeft:chan.mar}}></div>
        <button className="but" onClick={()=>{onClick();
        change();
        }}style={{marginLeft:chan.mar}}>{bu}</button>
        
    </div>
    <div className="Flex3">
        <div className="Pie">{(pieshow===true)?<Pie emotions={em}/>:null}</div>
    </div>
    </div>
    );

}
export default D1;