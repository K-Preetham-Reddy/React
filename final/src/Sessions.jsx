import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import './ses.css';
function Sessions({ session, setCurrentSession }) {
  const [name,setName]=useState("Fetch Analysis");//Intial name-->Fetch Analysis
  const navigate = useNavigate();

  const handleFetchAnalysis = () => {
    setName("View Analysis");//Changing the name to-->View Analysis
    setCurrentSession(session);//     Varun--->Set a function which is going to run the analysis and the data of the images will be accessed through the paths in MongoDB
    navigate('/dpanalysis',{state:{session}});//The above line and this one will lead directly to the second webpage but that shouldn't be the case, After the analysis is done, the analysis should be sent to mongoDB according to the schema
    //that I have mentioned and after the View Analysis button is clicked, the user should be lead to the next web page.
  };

  return (
    <div className="blocks" >
      <div className="flexse">Session_Id: {session.Session_Id}</div>
      <div className="flexup"><div>Username: {session.Username}</div></div>
      <button type="button" className="btn btn-success fa " onClick={handleFetchAnalysis}>{name}</button>
    </div>
  );
}
export default Sessions;

