import React, { useState, useEffect} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { axiosRequest } from "../../API/api";
import { requests } from "../../API/requests";


interface formData{
    email?:string,
    password?:string,
    cpassword?:string,
    className?:string
}
const PasswordRecovery:React.FC<formData>=()=> {
    const [validemail, setvalidEmail] = useState(true)
  
  const navigate = useNavigate();
    
    const [formData, setFormData] = useState<formData>({
        email: "",
        password: "",
        cpassword: "",
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
        const value:any = event.target.value;
        setFormData({ ...formData, [key]: value });
      };
 

      //email validator
      const checkEmail = (email:string) => {
      const emailpatten= new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        if(emailpatten.test(email)){
            setvalidEmail(false);
      }

      }

    //TODO backend
    //submission form function
    const handleSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault();
        checkEmail(formData.email);
        if (validemail){

        }


        if(formData.password !== formData.cpassword){
            return
        } 
        
        axiosRequest.patch(`${requests.passwordrecovery}/email="${formData.email}"`, formData)
        .then(response =>  {
          if(Object.values(response.data).length > 1) {
              alert("Password recovery successful")
              navigate("/login");
          }else{
            alert("account not found");
          }      
    }).then(() => setIsLoading(false))  
  
  }


return( 
    <>
           <form onSubmit={handleSubmit}>
        <h4>Recover Account!</h4>
          <label>
            Username
            <input
              className={validemail?"inputs":"invalid"}
              type="text"
              placeholder="Email"
              id="email"
              autoComplete="off"
            required
              onChange={handleChange}
              ref={userRef}
              value={formData.email}
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
          <label>
            Cornfirn Password
            <input
              className="inputs"
              type="password"
              placeholder="******"
              id="cpassword"
              required
              value={formData.cpassword}
              onChange={handleChange}
            />
          </label>
          <div className="nav">
            <button className="btn-pry" type="submit">
              Reset password
            </button>
          </div>
          <span className="misc">
          <p onClick={() => navigate("/login")}>Back to login Page</p>
          </span>

        </form>

    </>)
}

export default PasswordRecovery;