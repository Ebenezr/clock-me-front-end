import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Userinfo from "../components/cards/Userinfo";
import UserList from "../components/cards/UserList";
import Welcomeinfo from "../components/cards/Welcomeinfo";
import Starts from "../components/cards/Starts";
import Searchbar from "../components/forms/Searchbar";
import { appContext } from "./Main";
import { TimecardProp } from "./Timecard";

const Admin: React.FC<TimecardProp> = ({
  currentuser,
  setCurrentUser,
  filterUsers,
  deleteUser,
}) => {
  const employees = useContext(appContext);

  // const handleFilterFunction = () => {
  //   handleSearch(inputEl.current.value);

  // };

  const renderUser = (id: number): void => {
    const user = employees.filter((element) => {
      return element.id === id;
    });

    const userobj = user[0];
    setCurrentUser(userobj);
  };

  return (
    <section className="admin__view">
      <article className="left">
        <Welcomeinfo />
        <Starts />
        <Searchbar filterUsers={filterUsers} />
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
          <UserList renderUser={renderUser} />
        </div>
      </article>
      <article className="right">
        <Userinfo currentuser={currentuser} />
        <div className="right-manage">
          <NavLink className="btn-new btn" to="update">
            Update Info
          </NavLink>
          <NavLink className="btn-new btn" to="addnew">
            Add New?
          </NavLink>
          <button
            className="btn-del btn"
            onClick={() => deleteUser(currentuser.id)}
          >
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

const NotAdmin = () => {
  <>Need to login as an admin!</>;
};
