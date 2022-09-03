import React from "react";
import Welcomeinfo from "../components/cards/Welcomeinfo";
import Starts from "../components/cards/Starts";
import Searchbar from "../components/forms/Searchbar";
import Employeecard from "../components/cards/Employeecard";
import { useContext } from "react";
import { userInterface } from "../interfaces/interface";
import { appContext } from "./Main";


const Dashboard:React.FC = () => {
  const employees = useContext(appContext);
  console.log("employees")

  return (
    <section className="dashboard__view">
      <article className="left">
        <Welcomeinfo />
        <Starts  />
        <Searchbar />
        <div className="users-list">
          <div className="user-title">
            <h3>Employees </h3>
          </div>
        </div>
      </article>
      <article className="right">
        {/* {allusers?.map((profile, index) => (
          <Employeecard
            key={index}
            avatar={profile.picture.medium}
            usrname={profile.name.first}
            staffid={profile.cell}
            department={profile.email}
          />
        ))} */}
      </article>
    </section>
  );
};

export default Dashboard;
