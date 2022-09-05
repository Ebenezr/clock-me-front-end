import React,{useContext} from 'react';
import { accContext } from "../../App";
const Welcomeinfo:React.FC=()=> {
  const accUser = useContext(accContext);
  return (
    <div className="welcome-info">
    <h2>Hello {accUser?.name}</h2>
    <span>Welcome back!</span>
  </div>
  )
}

export default Welcomeinfo