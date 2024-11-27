import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import PatchDetails from "./patch-details";
import { useEffect, useState } from "react";
import Home from "./Home";
import GetDetails from "./get-details";

const Details = () => {
  return (
    <div>
      <h1>Details Page</h1>
      <p>This is the page for Mohit's details.</p>
    </div>
  );
};

function App() {
  const [detailsList, setDetailsList] = useState(new Array<string>()); // State to store API data
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://20.15.165.14:5000/list-details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDetailsList(data.detailsList); // Save the data to state
      } catch (error) {
        setDetailsList([]);
        console.error("Error fetching details list:", error);
      } finally {
        setLoading(false); // Mark loading as complete
      }
    };

    fetchData(); // Call the fetch function
  }, []);
  
  
  return (
    <Router>
      <Routes>
        detailsList && <Route path="/" element={<Home detailsList={detailsList}/>} /> {/* Home route */}
        {/* <Route path="/get-details/mohit" element={<Details />} /> Details route */}
        <Route path="/get-details" element={<GetDetails />} /> {/* Details route */}
        <Route path="/patch-details" element={<PatchDetails />} /> {/* Details route */}
      </Routes>
    </Router>
  );
}

export default App;
