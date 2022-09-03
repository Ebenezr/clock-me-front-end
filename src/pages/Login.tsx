import React, { useState, useEffect} from "react";
//import { useNavigate } from "react-router-dom";
import { axiosRequest } from '../API/api';
import {requests} from '../API/requests';
import { userInterface } from "../interfaces/interface";

interface formData{
    username?:string,
    password?:string,
    remember_me?:boolean
}
const Login:React.FC<formData>=()=> {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState<formData>({
        username: "",
        password: "",
        remember_me: true,
    });
    const [loading,setIsLoading] =useState(true);
    const [account, setAccount] = useState({});
    const [loggeduser, setLoggedUser] = useState({});
    const [authenticated, setauthenticated] = useState(false);
    const userRef=React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    axiosRequest.get(requests.fetchUsers)
    .then((res:any) =>setUsers(res.data))
    .then(()=>setIsLoading(false))
    .catch((err:any)=>console.error(err))

    if(null !== userRef.current && !loading){
        userRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    //hangle change event
    const handleChange = (event:any):void => {
        const key:string = event.target.id;
        const value:any =
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value;
    
        setFormData({ ...formData, [key]: value });
      };
 
    //TODO backend
    //submission form function
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        let useraccount:userInterface={
          name: "",
          username: "",
          password: "",
          admin: false,
          staffid: "",
          department: "",
          avatar: "",
        }
        console.log(formData);
        console.log(users)


        localStorage.setItem("name", JSON.stringify(useraccount));
        localStorage.setItem("authenticated", JSON.stringify(true));
    }    

    return (
        <section id="login">
              <div className="container__login">
        <h2>
          Clock-Me<span>System</span>
        </h2>
        <form onSubmit={handleSubmit}>
        <h4>Sign in to start your session</h4>
          <label>
            Username
            <input
              className="inputs"
              type="text"
              placeholder="Usename"
              id="username"
              autoComplete="off"
              required
              onChange={handleChange}
              ref={userRef}
              value={formData.username}
            />
          </label>
          <label>
            Password
            <input
              className="inputs"
              type="password"
              placeholder="******"
              id="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <div className="nav">
            <span>
              <input
                type="checkbox"
                id="rememberMe"
                checked={formData.remember_me}
                onChange={handleChange}
              />
              <h3>
                <strong>Remeber Me</strong>
              </h3>
            </span>
            <button className="btn-pry" type="submit">
              Sign In
            </button>
          </div>
          <span className="misc">
          {/* eslint-disable-next-line react-hooks/exhaustive-deps */}
            <a href="#">I forgot my password</a>
          </span>

        </form>
</div>
            </section>
    )
}
export default Login;