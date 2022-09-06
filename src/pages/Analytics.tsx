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
        <Searchbar />
        <div className="users-list">
          <div className="user-title">
            <h3>Employees </h3>
            <select
            //   type="option"
            //   ref={inputEl}
              onChange={handleFilter}
            >
              <option value="all">Filter</option>
              <option value="System Design">System Design</option>
              <option value="sales">Sales</option>
              <option value="hospitality">Hospitality</option>
            </select>
          </div>
        </div>
      </article>
      <article className="right">
    
          <CircularProgressbar value={8} maxValue={11} text={`${8 * 100}%`} />
  
      </article>
    </section>
  );
};

export default Analytics;
