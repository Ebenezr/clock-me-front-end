import React from "react";
import { TimecardProp } from "../../pages/Timecard";

const Userinfo:React.FC<TimecardProp> = ({currentuser}) => {


  return (
    <div className="card">
      <img src={currentuser.avatar} alt="avatar" />
      <h3>{currentuser.name}</h3>
      <span className="card-info">
        <span>Usertype</span>
        <p>{currentuser.usertype ? "Admin" : "User"}</p>
      </span>
      <span className="card-info">
        <span>StaffId</span>
        <p>{currentuser.staffid}</p>
      </span>
      <span className="card-info">
        <span>Department</span>
        <p>{currentuser.department_id}</p>
      </span>
    </div>
  );
};

export default Userinfo;
