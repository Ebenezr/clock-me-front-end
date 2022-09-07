import React,{useRef,useContext, useEffect, useState} from "react";
import Welcomeinfo from "../components/cards/Welcomeinfo";
import Starts from "../components/cards/Starts";
import { appContext } from "./Main";
import { userInterface } from "../interfaces/interface";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import ProgressProvider from "../utils/ProgressProvider";
import {  AdaptiveLayout, Chart, SeriesTemplate, CommonSeriesSettings, Title,
  Font
} from 'devextreme-react/chart'
import { axiosRequest } from "../API/api";
import { requests } from "../API/requests";

interface Analyticsprops{
  currentuser?:userInterface
}


const Analytics:React.FC<Analyticsprops> = ({currentuser}) => {
// const employees = useContext(appContext);
// {avatar,department}=employees;
// const inputEl=React.useRef<HTMLInputElement>(null);
const [data, setdata]= useState({
  monday:0,
  tuesday:0,
  wednesday:0,
  thursday:0,
  friday:0,
})

useEffect(() => {
const getTimestamps=() => {
  axiosRequest.get(`${requests.gettimestamp}/${currentuser?.id}`)
  .then(response =>  {
    console.log(response.data)
    setdata(response.data)
    if(Object.values(response.data).length > 1) {
      //  alert("Update successful")

    }else{
      alert("Employee Not Found");
    }      
})}
getTimestamps();
},[])


  const dataSource = [
    { day: 'Monday', number: data?.monday , colors: "#fff"},
    { day: 'Tuesday', number: data?.tuesday },
    { day: 'Wednesday', number: data?.wednesday },
    { day: 'Thursday', number: data?.thursday },
    { day: 'Friday', number: data?.friday },
  ];

  // {/* <CircularProgressbar value={8} maxValue={11} text={`${8 * 100}%`} /> */}
  return (
    <section className="analytics__view">
      <article className="left">
        <Welcomeinfo />
        <Starts /> 
      </article>
      <article className="right">
      <Chart
        id="chart"
        palette="Soft"
        dataSource={dataSource}>
          <AdaptiveLayout
                    height={200}
                    width={500}
                />
        <CommonSeriesSettings
          argumentField="day"
          valueField="number"
          type="bar"
          ignoreEmptyPoints={true}
        
        />
        <SeriesTemplate nameField="day" />
        <Title
          text="Weekly perfomance"
          subtitle={`${currentuser.name}`}
        >
              <Font color="white" />
            
        </Title>
      </Chart>
    
          
  
      </article>
    </section>
  );
};

export default Analytics;
