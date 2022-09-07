import { NavLink } from "react-router-dom";
import React, { useContext, useState } from "react";

import {
  MdSpaceDashboard,
  MdAdminPanelSettings,
  MdAnalytics,
  MdOutlineAccessTimeFilled,
  MdOutlineClose,
  MdWbSunny,
} from "react-icons/md";
import { IoTimer } from "react-icons/io5";
import { BsMoonFill } from "react-icons/bs";
import { accContext } from "../../App";

const Aside: React.FC<{ className?: string }> = () => {
  const accUser = useContext(accContext);
  const [isActive, setActive] = useState(false);

  //toggle themes
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <aside>
      <div className="top dark-mode">
        <div className="logo">
          <IoTimer className="logo__icon" />
          <h2>Clock-Me</h2>
        </div>
        <div className="close">
          <MdOutlineClose />
        </div>
      </div>

      <fieldset className="side-bar" title="manage">
        <legend>MANAGE</legend>

        <NavLink
          className="nav__link"
          // activeclassname="active"
          to="/home/dashboard"
        >
          <MdSpaceDashboard />
          <h3>Dashboard</h3>
        </NavLink>

        <NavLink
          className="nav__link"
          // activeclassname="active"
          to="/home/admin"
        >
          <MdAdminPanelSettings />
          <h3>Admin</h3>
        </NavLink>

        <NavLink
          className="nav__link"
          // activeclassname="active"
          to="/home/analytics"
        >
          <MdAnalytics />
          <h3>Analytics</h3>
        </NavLink>

        <NavLink
          className="nav__link"
          // activeclassname="active"
          to="/home/timecard"
        >
          <MdOutlineAccessTimeFilled />
          <h3>Timecard</h3>
        </NavLink>
      </fieldset>
      <fieldset className="preference" title="preference">
        <legend>PREFRENCES</legend>
        <div className="content-wrapper">
          <h3>Theme</h3>
          <div className="theme-toggler" onClick={handleToggle}>
            <span className={isActive ? "active" : ""}>
              <MdWbSunny />
            </span>
            <span className={!isActive ? "active" : ""}>
              <BsMoonFill />
            </span>
          </div>
        </div>
      </fieldset>

      <div className="aside__footer">
        <div className="profile">
          <div className="profile-photo">
            <img src={accUser?.avatar} alt="Img" />
          </div>
          <div className="info">
            <p>
              <b>{accUser?.name}</b>
            </p>
            <small className="text-muted">
              {accUser?.usertype ? "Admin" : "User"}
            </small>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Aside;
