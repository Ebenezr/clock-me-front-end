import React, { useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdMenu } from "react-icons/md";
import Aside from "./nav/nav";
import { MainProps } from "../pages/Main";
import { useNavigate } from "react-router-dom";
// interface MainProps{
//   authenticated:boolean,
//   setauth(auth:boolean):void

// }
const Header:React.FC<MainProps> = ({setauth, authenticated}) => {
  const navigate = useNavigate();
  const [toggleNavBar, setToggle] = useState(false);

  return (
    <header>
      <button
        onClick={() => {
          setToggle(!toggleNavBar);
        }}
      >
        <MdMenu />
        {toggleNavBar ? <Aside /> : null}
      </button>
      <span>
        <RiLogoutCircleLine></RiLogoutCircleLine>
        <h3
          onClick={() => {
            //setauth(!authenticated);
            localStorage.setItem("authenticated", JSON.stringify(false));
            navigate("/");
            //localStorage.clear();
          }}
        >
          Logout
        </h3>
      </span>
    </header>
  );
};

export default Header;
