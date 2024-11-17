import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sessions from './Sessions.jsx';
import DpAnalysis from './DpAnalysis.jsx';
import './Home.css';
function Home() {
  const [database, setDatabase] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data');
        setDatabase(response.data);
      } catch (error) {
        console.error("Error fetching the data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex1">
      <div className="Head"><div>Database</div></div>
      <div className="List">
        {database.map((doc, index) => (
          <Sessions key={index} session={doc} setCurrentSession={setCurrentSession}/>
        ))}
        
      </div>
      {currentSession && <DpAnalysis session={currentSession} />}
    </div>
  );
}

export default Home;

