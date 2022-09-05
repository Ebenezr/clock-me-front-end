import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { axiosRequest } from '../API/api';
import {requests} from '../API/requests';
import { userInterface } from "../interfaces/interface";

interface formData{
    username?:string,
    password?:string,
    remember_me?:boolean
}
const Login:React.FC<formData>=()=> {
  
  const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState<formData>({
        username: "",
        password: "",
        remember_me: true,
    });
    const [loading,setIsLoading] =useState(true);
    const userRef=React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(null !== userRef.current){
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
    const handleSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault();
        
        axiosRequest.post(requests.loginuser, formData)
        .then(response =>  {
          if(Object.values(response.data).length > 1) {
              localStorage.setItem("name", JSON.stringify(response.data));
              localStorage.setItem("authenticated", JSON.stringify(true));
              alert("Login successful")
              navigate("/home/dashboard");
          }else{
            alert("user doesn't exist");
          }      
    }).then(() => setIsLoading(false))  
  
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