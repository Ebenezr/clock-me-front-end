import React, { useContext, useState } from "react";
import {
  BsFillCalendarDateFill,
  BsPieChartFill,
  BsServer,
} from "react-icons/bs";
import { axiosRequest } from "../../API/api";
import { requests } from "../../API/requests";
import { appContext } from "../../pages/Main";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../scss/custom.scss";

const Starts: React.FC = () => {
  const [departments, setDepartment] = useState<number>();
  const employees = useContext(appContext);

  axiosRequest.get(requests.fetchDepartments).then((response) => {
    setDepartment(response.data);
  });

  //get total number of departments
  //const unique = [...new Set(employees.map((item) => item.department))];

  return (
    <div className="starts">
      <div className="starts__card one">
        <span className="icon__starts">
          <BsFillCalendarDateFill color="#41f1b6" className="myReact-icons" />
        </span>
        <h3>{employees.length - 14}</h3>
        <small>Employees working today</small>
        <div className="progress">
          <CircularProgressbar
            value={employees.length - 14}
            maxValue={25}
            text={`${((employees.length - 14) / 25) * 100}%`}
            styles={buildStyles({
              strokeLinecap: "round",
              textSize: "26px",
              pathTransitionDuration: 0.5,
              pathColor: `#7380ec`,
              textColor: "#7d8da1",
              trailColor: "transparent",
              backgroundColor: "transparent",
            })}
          />
        </div>
      </div>
      <div className="starts__card two">
        <span className="icon__starts">
          <BsFillCalendarDateFill color="#7380ec" className="myReact-icons" />
        </span>
        <h3>{employees.length}</h3>
        <small>Active Employees</small>
        <div className="progress">
          <CircularProgressbar
            value={employees.length}
            maxValue={25}
            text={`${(employees.length / 25) * 100}%`}
            styles={buildStyles({
              strokeLinecap: "round",
              textSize: "26px",
              pathTransitionDuration: 0.5,
              pathColor: `#7380ec`,
              textColor: "#7d8da1",
              trailColor: "transparent",
              backgroundColor: "transparent",
            })}
          />
        </div>
      </div>
      <div className="starts__card three">
        <span className="icon__starts">
          <BsPieChartFill color="#ff7782" className="myReact-icons" />
        </span>
        <h3>{departments}</h3>
        <small>Total Departments</small>
        <div className="progress">
          <CircularProgressbar
            value={departments}
            maxValue={25}
            text={`${(departments / 25) * 100}%`}
            styles={buildStyles({
              strokeLinecap: "round",
              textSize: "26px",
              pathTransitionDuration: 0.5,
              pathColor: `#7380ec`,
              textColor: "#7d8da1",
              trailColor: "transparent",
              backgroundColor: "transparent",
            })}
          />
        </div>
      </div>
      <div className="starts__card four">
        <span className="icon__starts">
          <BsServer color="#ffbb55" className="myReact-icons" />
        </span>
        <h3>{employees.length}</h3>
        <small>Total Employees</small>
        <div className="progress">
          <CircularProgressbar
            value={employees.length}
            maxValue={25}
            text={`${(employees.length / 25) * 100}%`}
            styles={buildStyles({
              strokeLinecap: "round",
              textSize: "26px",
              pathTransitionDuration: 0.5,
              pathColor: `#7380ec`,
              textColor: "#7d8da1",
              trailColor: "transparent",
              backgroundColor: "transparent",
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default Starts;
