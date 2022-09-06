import React from "react";
import { userInterface } from "../../interfaces/interface";

interface EmployeecardProp{
  employee:
  {
    avatar?:string,
    username?:string,
    department?:string,
    staffid?:string,
    email?:string,
  }
}

const Employeecard:React.FC<EmployeecardProp> = ({employee:{avatar,username,department,staffid,email}}) => {
  return (
    <div className="emp__card" id="card">
      <div className="top">
        <img src={avatar} alt="avatar" /> 
        <h3 id="card-title">{username}</h3>
      </div>
      <div className="bottom">
        <h4 id="card-designation">{email}</h4>
       <small>{staffid}</small>
      </div>
    </div>
  );
};

export default Employeecard;
