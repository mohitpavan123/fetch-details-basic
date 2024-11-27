import React from "react";
import { useNavigate } from "react-router-dom";

const Home : React.FC<{detailsList: Array<string>}> = ({ detailsList}) => {
    const navigate = useNavigate();
  
    const goToDetails = (name) => {
      navigate(`/get-details?name=${name}`); // Navigate to the desired route
    };
    const goToCreateDetails = () => {
      navigate("/patch-details"); // Navigate to the desired route
    };
  
    return (
      <div>
        <h1>Home Page</h1>
        {
          detailsList && detailsList.map((detail: string) => (
            console.log(detail),
            <button onClick={()=>goToDetails(detail)}>Go to {detail} Details</button>
          ))
        }
        <button onClick={goToCreateDetails}>Go to add/edit Details</button>
      </div>
    );
};
export default Home;