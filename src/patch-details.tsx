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
// import { fromAddress, fromPlaceId, geocode, setKey } from 'react-geocode'

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];


const PatchDetails: React.FC = () => {
  const [countryid, setCountryid] = useState(0);
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [stateid, setstateid] = useState(0);
  const [cityid, setcityid] = useState(0);
  const [nameValue, setNameValue] = useState("");
  const [value, onChange] = useState<Value>(new Date());
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value);
  };
  const handleAnsButtonClick = async () => {
    // setKey('AIzaSyDLHEavL53RMaVRUaFAXawWXw3IJjyIxPU');
    // const longlat = await fromAddress(cityName+','+stateName+','+countryName);
    // const placeId = await fromPlaceId(cityid.toString());
    // console.log(longlat, placeId);
    const response = await fetch('http://20.15.165.14:5000/patch-details',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          name: nameValue,
          countryid: countryName,
          stateid: stateName,
          cityid: cityName,
          dob: value
        })
      }
    );
    if (response.ok) {
        alert("Details updated successfully!");
    } else {
        alert("failed to update details!");
    }

    setCityName("");
    setCountryName("");
    setStateName("");
    setNameValue("");
    setcityid(0);
    setCountryid(0);
    setstateid(0);
    onChange(new Date());
  }
  return(
    <div>
      <h6>Name</h6>
      <input
        type="text"
        id="name"
        value={nameValue}
        onChange={handleChange}
      />
      <h6>Country</h6>
      <CountrySelect
        onChange={(e) => {
          setCountryid(e.id);
          setCountryName(e.name);
        }}
        value={countryid}
        placeHolder="Select Country"
      />
      <h6>State</h6>
      <StateSelect
        countryid={countryid}
        onChange={(e) => {
          setstateid(e.id);
          setStateName(e.name);
        }}
        value={stateid}
        placeHolder="Select State"
      />
      <h6>City</h6>
      <CitySelect
        countryid={countryid}
        stateid={stateid}
        onChange={(e) => {
          setcityid(e.id);
          setCityName(e.name);
        }}
        value={cityid}
        placeHolder="Select City"
      />
      <h6>Time of birth</h6>
      <DateTimePicker onChange={onChange} value={value} />
      <PrimaryButton text="update details" onClick={handleAnsButtonClick}/>
    </div>
  );
}
export default PatchDetails;