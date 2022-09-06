import React, { useState, useId, useContext } from "react";
import Userinfo from "../components/cards/Userinfo";
import UserList from "../components/cards/UserList";
import Welcomeinfo from "../components/cards/Welcomeinfo";
import Searchbar from "../components/forms/Searchbar";
import { appContext } from "./Main";
import { userInterface } from "../interfaces/interface";


export interface TimecardProp{
  currentuser:userInterface,
  setCurrentUser(obj:userInterface):void
  postTimeStamp?(id:number,obj:userInterface):void
  filterUsers(str:string):void;
  activeclassname?:string

}

const Timecard:React.FC<TimecardProp> = ({currentuser,setCurrentUser,postTimeStamp,filterUsers}) => {
  const employees = useContext(appContext);
  console.log(employees)
  // const id = useId();
  const [stamps, setStamp] = useState<string>();
  const renderUser = (id:number):void => {
    const user = employees.filter((element) => {
      return element.id === id;
    });
    const userobj = user[0];
    setCurrentUser(userobj);
  };

  let timeIn:Date;
  let timeOut:Date;
  const clockInTime = () => {
    timeIn = new Date();
    return timeIn;
  };
 // function clock-out and return day's timestamp
  const clockOutTime = () => {
    //chech if user acccount is selected
    if (currentuser.name !== null) {
      if (!timeIn !== null) {
        timeOut = new Date();
        let currentstamp = `${timeIn}-${timeOut}`;
        setStamp(currentstamp);
        //TODO
       // currentuser.timestamp?.push(stamps);
        //if current stamp is empty dont..
        if (stamps !== null) {
          setCurrentUser(currentuser);
        //  postTimeStamp(currentuser?.id, currentuser);
        }
      }
    } else {
      alert("Please select your account!");
    }
  };

  return (
    <section className="timecard__view">
      <article className="left">
        <Welcomeinfo />
        <Searchbar />
        <div className="users-list">
          <div className="user-title">
            <h3>Employees List</h3>
            <select
              
              onChange={(e) => {
                filterUsers(e.target.value);
              }}
            >
              <option value="all">Filter</option>
              <option value="System Design">System Design</option>
              <option value="sales">Sales</option>
              <option value="hospitality">Hospitality</option>
            </select>
          </div>
          <UserList 
           renderUser={renderUser}
          />
        </div>
      </article>
      <article className="right">
        <Userinfo />
        <div className="right-manage">
          <button className="btn-out btn" onClick={clockInTime}>
            Clock-In
          </button>
          <button className="btn-in btn" onClick={clockOutTime}>
            Clock-Out
          </button>
        </div>
        <div className="forms-container">
          <h3>My Timestamps</h3>
          <div className="timestamp-container">
            {/* {currentuser.timestamp.map((times) => (
              <span key={`${id}-stamps`}>{times}</span>
            ))} */}
          </div>
        </div>
      </article>
    </section>
  );
};

export default Timecard;
