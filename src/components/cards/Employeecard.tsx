import React from "react";
import { userInterface } from "../../interfaces/interface";

interface EmployeecardProp{
  employee:
  {
    avatar?:string,
    username?:string,
    department?:string,
    staffid?:string,
  }
}

const Employeecard:React.FC<EmployeecardProp> = ({employee:{avatar,username,department,staffid}}) => {
  return (
    <div className="emp__card1" id="card">
      <div className="top">
        <img src={avatar} alt="avatar" /> 
        <h3 id="card-title">{username}</h3>
      </div>
      <div className="bottom">
        <h4 id="card-designation">{department}</h4>
       <small>{staffid}</small>
      </div>
    </div>
  );
};

export default Employeecard;
