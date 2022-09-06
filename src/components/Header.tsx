import React, { useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdMenu } from "react-icons/md";
import Aside from "./nav/nav";
import { MainProps } from "../pages/Main";
import { useNavigate } from "react-router-dom";

const Header:React.FC<MainProps> = () => {
  const navigate = useNavigate();
  const [toggleNavBar, setToggle] = useState(false);

  return (
    <header>
      <button
        onClick={() => {
          setToggle(!toggleNavBar);
        }}
      >
        <MdMenu size="3rem" color="#dce1eb"/>
        {toggleNavBar ? <Aside /> : null}
      </button>
      <span>
        <RiLogoutCircleLine size="1.5rem" color="#dce1eb"/>
        <h3
          onClick={() => {
            localStorage.setItem("authenticated", JSON.stringify(false));
            navigate("/login");
          }}
        >
          Logout
        </h3>
      </span>
    </header>
  );
};

export default Header;
