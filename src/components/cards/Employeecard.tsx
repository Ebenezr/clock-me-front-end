import React from "react";
import { userInterface } from "../../interfaces/interface";

interface EmployeecardProp {
  employee: {
    avatar?: string;
    name?: string;
    staffid?: string;
    email?: string;
  };
}

const Employeecard: React.FC<EmployeecardProp> = ({
  employee: { avatar, name, staffid, email },
}) => {
  return (
    <div className="emp__card" id="card">
      <div className="top">
        <img src={avatar} alt="avatar" />
      </div>
      <div className="bottom">
        <h3 id="card-title">{name}</h3>
        <h4 id="card-designation">{email}</h4>
      </div>
    </div>
  );
};

export default Employeecard;
