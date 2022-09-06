import React,{useContext} from "react";
import {
  BsFillCalendarDateFill,
  BsPieChartFill,
  BsServer,
} from "react-icons/bs";
import { appContext } from "../../pages/Main";



const Starts:React.FC = () => {
  const employees = useContext(appContext);
  //get total number of departments
  //const unique = [...new Set(employees.map((item) => item.department))];

  return (
    <div className="starts">
      <div className="starts__card one">
        <span className="icon__starts"><BsFillCalendarDateFill color="#41f1b6" size="3.5rem"/></span>
        <h3>{employees.length}</h3>
        <small>Employees working today</small>
        <div className="progress">
          <svg>
            <circle cx='35' cy='35' r='30'></circle>
            </svg>
            <div className="number">
              <small>81%</small>
            </div>
        </div>
      </div>
      <div className="starts__card two">
      <span className="icon__starts"><BsFillCalendarDateFill color="#7380ec" size="3.5rem"/></span>
        <h3>{employees.length}</h3>
        <small>Active Employees</small>
        <div className="progress">
          <svg>
            <circle cx='35' cy='35' r='30'></circle>
            </svg>
            <div className="number">
              <small>81%</small>
            </div>
        </div>
      </div>
      <div className="starts__card three">
      <span className="icon__starts"><BsPieChartFill color="#ff7782" size="3.5rem" /></span>
        <h3>{employees.length}</h3>
        <small>Total Departments</small>
        <div className="progress">
          <svg>
            <circle cx='35' cy='35' r='30'></circle>
            </svg>
            <div className="number">
              <small>81%</small>
            </div>
        </div>
      </div>
      <div className="starts__card four">
      <span className="icon__starts"><BsServer color="#ffbb55" size="3.5rem" /></span>
        <h3>{employees.length}</h3>
        <small>Total Employees</small>
        <div className="progress">
          <svg>
            <circle cx='35' cy='35' r='30'></circle>
            </svg>
            <div className="number">
              <small>81%</small>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Starts;
