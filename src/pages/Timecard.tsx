import React, { useContext, useEffect, useState } from "react";
import Userinfo from "../components/cards/Userinfo";
import UserList from "../components/cards/UserList";
import Welcomeinfo from "../components/cards/Welcomeinfo";
import Searchbar from "../components/forms/Searchbar";
import { appContext } from "./Main";
import { userInterface } from "../interfaces/interface";
import { axiosRequest } from "../API/api";
import { requests } from "../API/requests";

export interface TimecardProp {
  currentuser?: userInterface;
  setCurrentUser?(obj: userInterface): void;
  postTimeStamp?(id: number, obj: userInterface): void;
  filterUsers?(str: string): void;
  activeclassname?: string;
  deleteUser?(id: number): void;
  //setUsers(arr: userInterface[]): void;
}

const Timecard: React.FC<TimecardProp> = ({
  currentuser,
  setCurrentUser,
  filterUsers,
}) => {
  const [timerecord, setTimerecords] = useState({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
  });
  const employees = useContext(appContext);
  // const id = useId();
  //const [stamps, setStamp] = useState<string>();

  useEffect(() => {
    axiosRequest
      .get(`${requests.gettimerecord}/${currentuser?.id}`)
      .then((response) => setTimerecords(response?.data));
  }, [currentuser]);

  const renderUser = (id: number): void => {
    const user = employees.filter((element) => {
      return element.id === id;
    });
    const userobj = user[0];
    setCurrentUser(userobj);
  };

  let timeIn: Date;
  let timeOut: Date;
  let day: number;
  const clockInTime = () => {
    timeIn = new Date();
    return timeIn;
  };

  //function to get clocked-in's day
  const getDay = (timeIn: Date): string => {
    day = timeIn.getDay();
    switch (day) {
      case 1:
        return "monday";
      case 2:
        return "tuesday";
      case 3:
        return "wednesday";
      case 4:
        return "thursday";
      case 5:
        return "friday";
      default:
        return;
    }
  };

  //function to get hours worked in aday
  const getHours = (timeIn: Date, timeOut: Date) => {
    let difference: number = timeOut.getTime() - timeIn.getTime();
    let hoursDifference: number = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60;
    return hoursDifference;
  };

  // function clock-out and return day's timestamp
  const clockOutTime = () => {
    console.log(timeIn);
    timeOut = new Date();
    const createData = () => {
      const key = today;
      const value = hours;
      let timestamp = { [key]: value };
      return timestamp;
    };
    const createTimerecord = () => {
      const key = today;
      const value = `${timeIn.toUTCString()}-${timeOut.toUTCString()}`;
      let timestamp = { [key]: value };
      return timestamp;
    };

    //check if any account is selected
    if (Object.values(currentuser).length < 1) {
      return alert("Please select your account!");
    }
    //check if user clocked in?
    if (timeIn === undefined) {
      return alert("You should first clockIn!");
    }
    let today: string = getDay(timeIn);
    let hours: number = getHours(timeIn, timeOut);
    // console.log(createTimerecord());
    try {
      axiosRequest
        .put(`${requests.updatetimestamp}/${currentuser?.id}`, createData())
        .then((resp) => {
          axiosRequest
            .get(`${requests.gettimerecord}/${resp.data?.id}`)
            .then((response) => setTimerecords(response?.data));
        });
      axiosRequest.put(
        `${requests.updatetimerecord}/${currentuser?.id}`,
        createTimerecord()
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="timecard__view">
      <article className="left">
        <Welcomeinfo />
        <Searchbar filterUsers={filterUsers} />
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
          <UserList renderUser={renderUser} />
        </div>
      </article>
      <article className="right">
        <Userinfo currentuser={currentuser} />
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
            {timerecord?.monday && <span>{timerecord?.monday}</span>}

            {timerecord?.tuesday && <span>{timerecord?.tuesday}</span>}

            {timerecord?.wednesday && <span>{timerecord?.wednesday}</span>}

            {timerecord?.thursday && <span>{timerecord?.thursday}</span>}

            {timerecord?.friday && <span>{timerecord?.friday}</span>}
          </div>
        </div>
      </article>
    </section>
  );
};

export default Timecard;
