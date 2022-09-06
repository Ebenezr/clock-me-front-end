import React from "react";
import { TimecardProp } from "../../pages/Timecard";

export const getDepartment=(num:number) =>{
  switch(num){
    case 1:
      return "Hospitality"
    case 2:
      return "Human Resource"
    case 3:
      return "Support Desk"
    case 4:
      return "Design"
    case 5:
      return "Technical Support"
    default:
      return "Guest"          
  }
    


}
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
        <span>Title</span>
        <p>{currentuser?.title}</p>
      </span>
      <span className="card-info">
        <span>Department</span>
        <p>{getDepartment(currentuser.department_id)}</p>
      </span>
    </div>
  );
};

export default Userinfo;
