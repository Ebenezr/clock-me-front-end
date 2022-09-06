import React,{useContext, useRef} from "react";
import { NavLink, Outlet } from "react-router-dom";
import Userinfo from "../components/cards/Userinfo";
import UserList from "../components/cards/UserList";
import Welcomeinfo from "../components/cards/Welcomeinfo";
import Starts from "../components/cards/Starts";
import Searchbar from "../components/forms/Searchbar";
import { appContext } from "./Main";
import { userInterface } from "../interfaces/interface";
import { TimecardProp } from "./Timecard";



const Admin:React.FC<TimecardProp> = ({currentuser,setCurrentUser,filterUsers}) => {
  const employees = useContext(appContext);
  const inputEl = useRef("");
  // const handleFilterFunction = () => {
  //   handleSearch(inputEl.current.value);
    
  // };

  const renderUser = (id:number):void => {
    const user = employees.filter((element) => {
      return element.id === id;
    });
  
    const userobj = user[0];
    setCurrentUser(userobj);
  };
//  //delete user
//   const delUser = () => {
//     deleteUser(currentuser.id);
//   };

  return (
    <section className="admin__view">
      <article className="left">
        <Welcomeinfo />
        <Starts  />
        <Searchbar />
        <div className="users-list">
          <div className="user-title">
            <h3>Manage Employees</h3>
            <select
              // type="option"
              // onChange={handleFilterFunction}
              // ref={inputEl}
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
          <NavLink className="btn-new btn" to="update">
            Update Info
          </NavLink>
          <NavLink className="btn-new btn"  to="addnew">
            Add New?
          </NavLink>
          <button className="btn-del btn">
            Remove user
          </button>
        </div>
        <div className="forms-container">
          <Outlet />
        </div>
      </article>
    </section>
  );
};

export default Admin;
