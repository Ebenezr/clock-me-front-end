import React,{useRef,useContext} from "react";
import Welcomeinfo from "../components/cards/Welcomeinfo";
import Starts from "../components/cards/Starts";
// import Searchbar from "../components/forms/Searchbar";
import Employeecard from "../components/cards/Employeecard";
import Searchbar from "../components/forms/Searchbar";
import { appContext } from "./Main";
import { userInterface } from "../interfaces/interface";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import ProgressProvider from "../utils/ProgressProvider";

const Analytics:React.FC = () => {
const employees = useContext(appContext);
//{avatar,department}=employees;
const inputEl=React.useRef<HTMLInputElement>(null);
  const handleFilter=()=>{
    if(null !== inputEl.current){
        //filterUsers(inputEl.current.value);
    }
  }

  return (
    <section className="analytics__view">
      <article className="left">
        <Welcomeinfo />
        <Starts /> 
      </article>
      <article className="right">
    
          <CircularProgressbar value={8} maxValue={11} text={`${8 * 100}%`} />
  
      </article>
    </section>
  );
};

export default Analytics;
