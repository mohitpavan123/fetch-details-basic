import React, { useState } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { PrimaryButton } from '@fluentui/react';
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
// import { fromAddress, fromPlaceId, geocode, setKey } from 'react-geocode'

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];


const GetDetails: React.FC = () => {
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [dobValue, setDobValue] = useState(Date);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name"); // Replace "paramKey" with your key    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://20.15.165.14:5000/get-details/${name}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = JSON.parse(await response.json());
        // console.log(JSON.parse(data));
        setCityName(data.cityid);
        setCountryName(data.countryid);
        setStateName(data.stateid);
        setNameValue(data.name);
        console.log(data.dob, {dobValue}, data.cityid, data.countryid, data.stateid, data.name, {nameValue}, {cityName}, {countryName}, {stateName});
        setDobValue(data.dob && data.dob.toLocalDateString());
      } catch (error) {
        // setDetailsList([]);
        console.error("Error fetching details list:", error);
      } finally {
        setLoading(false); // Mark loading as complete
      }
    };

    fetchData(); // Call the fetch function
  }, []);
  return(
    
    <div>
      {name}
      <h6>Name : {nameValue}</h6>
      <h6>Country : {countryName}</h6>
      <h6>State: {stateName}</h6>
      <h6>City: {cityName}</h6>
      <h6>DOB: {dobValue}</h6>
    </div>
  );
}
export default GetDetails;