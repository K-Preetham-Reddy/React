// import React,{useState} from 'react';
// import { useLocation } from 'react-router-dom';
// import './dpa.css';
// import List from  './List.jsx';
// import Oa from './Oa.jsx';
// import D1 from './D1.jsx';
// function DpAnalysis() {
//   const location = useLocation();
//   const [over,setOver]=useState(false);
//   const { session } = location.state || {};  
//   const [rd,setRD]=useState({
//     em:{},
//     pi:"",
//     ts:"",
//     gs:"",
//   })
//   const [ovc,setOvc]=useState("Overall");
//   const [le,setLe]=useState({
//     flexBasis:"69vw",
//     borderRadius:"10px",
//     flexDirection:"column",
//     display:"flex",
//     gap:"1vw",
//     transition: "flexBasis 10s ease"
//   });
//   const [ri,setRi]=useState({
//     flexBasis: "30vw",
//     border:"1.5px solid black",
//     height:"93vh",
//     borderRadius:"10px",
//     transition: "flexBasis 10s ease"
//   })
//   const [ov,setOv]=useState({
//     flexBasis:"12vh",
//     border:"1.5px solid black",
//     borderRadius:"10px",
//     fontSize:"50px",
//     transition: "flexBasis 10s ease"
//   })
//   const [li,setLi]=useState({
//       flexBasis:"75vh",
//       border:"1.5px solid black",
//       borderRadius:"10px",
//       display:"flex",
//       flexDirection:"column",
//       gap:"5px",
//       padding:"10px",
//       overflowY:"auto",
//       overflowX:"hidden",
//       justifyContent:"space-around",  
//       transition: "flexBasis 10s ease"  
//   })
//   function detailed(){
//     setLe({
//       ...le,
//       flexBasis:"0vh",
//     })
//     setRi({
//       ...ri,
//       flexBasis:"100vw",
//     })
//     setOv({
//       ...ov,
//       flexBasis:"0px",
//       border:"0px solid white",
//     })
//     setLi({
//       ...li,
//       flexBasis:"0px",
//       width:"0px",
//       border:"0px solid white",
//     })
//     setOvc("")
//   }
//   const {Time_stamps,Emotions,Player_images,Game_screenshots}=session;
//   return (
//     <div className="Page">
//         <div className="Head">Analysis</div>
//         <div className="Flex" >
//             <div style={le}>
//                 <div className="OV" style={ov} onClick={()=>{setOver(true)}}>
//                     {ovc}
//                 </div>
//                 <div className="list" style={li}>
//                   {Time_stamps && Time_stamps.map((ts,index)=>{
//                     return (<List key={index} ts={ts} em={Emotions[index]} pi={Player_images[index]} gs={Game_screenshots[index]} onClick={()=>{setOver(false);setRD({em:Emotions[index],pi:Player_images[index],ts:ts,gs:Game_screenshots[index]})}}/>);
//                     })} 
//                 </div>
//             </div>
//             <div className="right" style={ri}>
//                 {(over)?<Oa total={session}/>:<D1 data={rd} onClick={detailed}/>}
//             </div>
//         </div>
//     </div>
//   );
// }

// export default DpAnalysis;
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './dpa.css';
import List from './List.jsx';
import Oa from './Oa.jsx';
import D1 from './D1.jsx';

function DpAnalysis() {
  const location = useLocation();
  const [over, setOver] = useState(false);
  const { session } = location.state || {};
  const [rd, setRD] = useState({
    em: [],
    pi: "",
    ts: "",
    gs: "",
  });
  const [ovc, setOvc] = useState("Overall");
  const [text,setText]=useState("Detailed Analysis");
  
  const [layout, setLayout] = useState({
    leftFlexBasis: "69vw",
    rightFlexBasis: "30vw",
    ovFlexBasis: "12vh",
    listFlexBasis: "75vh",
  });

  function detailed() {
    setLayout(prevset=>{
      if (prevset.leftFlexBasis==="69vw"){
        return {
          leftFlexBasis: "30vw",
          rightFlexBasis: "69vw",
          ovwidth: "30vw",
          listwidth: "30vw",
        }
      }
      else{
        return{
          leftFlexBasis: "69vw",
          rightFlexBasis: "30vw",
          ovwidth: "69vw",
          listwidth: "69vw"
        }
      }
    });
    setText((prevValue)=>(prevValue==="Detailed Analysis"?"Brief Analysis":"Detailed Analysis"));
  }

  const { Time_stamps, Emotions, Player_images, Game_screenshots } = session;

  return (
    <div className="Page">
      <div className="Head"></div>
      <div className="Flex">
        <div className="left" style={{ flexBasis: layout.leftFlexBasis }}>
          <div className="OV" style={{ flexBasis: layout.ovFlexBasis }} onClick={() => {setOver(true); }}>
            {ovc}
          </div>
          <div className="list" style={{ flexBasis: layout.listFlexBasis }}>
            {Time_stamps && Time_stamps.map((ts, index) => (
              <List key={index} ts={ts} em={Emotions[index]} pi={Player_images[index]} gs={Game_screenshots[index]} onClick={() => { setOver(false); setRD({ em: Emotions[index], pi: Player_images[index], ts, gs: Game_screenshots[index] }); }} />
            ))}
          </div>
        </div>
        <div className="right" style={{ flexBasis: layout.rightFlexBasis }}>
          {over ? <Oa total={session} onClick={detailed} text={text}/> : <D1 data={rd} onClick={detailed} text={text}/>}
        </div>
      </div>
    </div>
  );
}

export default DpAnalysis;
