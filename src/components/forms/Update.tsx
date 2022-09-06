import React, { useEffect, useState} from "react";
import { axiosRequest } from "../../API/api";
import { requests } from "../../API/requests";
import { userInterface } from "../../interfaces/interface";


interface Updateprops{
  currentuser:userInterface,
  setCurrentUser(obj:userInterface):void,

}

const Update:React.FC<Updateprops> = ({currentuser,setCurrentUser}) => {
  const [loading,setIsLoading] =useState(true);
  //hold user data
  const [formData, setFormData] = useState<userInterface>({});
 //set focus
 useEffect(() => {
  setFormData(currentuser)
}, [currentuser]);
  

//hangle change event
const handleChange = (event:any) => {
  const key = event.target.id 
  const value =
    event.target.type === "checkbox"
      ? event.target.checked?1:0
      : event.target.id === "department_id"? event.target.value = parseInt(event.target.value):event.target.value;

  setFormData({ ...formData, [key]: value });
};

const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    axiosRequest.patch(`${requests.updateinfo}/${currentuser.id}`, formData)
    .then(response =>  {
      console.log(formData)
      console.log(response.data)
      if(Object.values(response.data).length > 1) {
          alert("Update successful")

      }else{
        alert("Employee Not Found");
      }      
}).then(() => setIsLoading(false))  

  
  };

  return (
    <form className="addnew" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          id="name"
          type="text"
          className="inputs"
          value={formData?.name}
          onChange={handleChange}
          placeholder="Jon Doe"
        />
      </label>
      <label>
        UserName
        <input
          required
          id="username"
          type="text"
          className="inputs"
          value={formData?.username}
          onChange={handleChange}
          placeholder="ebbe"
        />
      </label>
      <label>
        Email
        <input
          required
          id="email"
          type="text"
          className="inputs"
          value={formData?.email}
          onChange={handleChange}
          placeholder="ebbe"
        />
      </label>
      <label>
      Gender
        <select
          id="gender"
          className="inputs"
          value={formData?.gender}
          onChange={handleChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <label>
        Avatar
        <input
          id="avatar"
          type="text"
          className="inputs"
          value={formData?.avatar}
          onChange={handleChange}
          placeholder="https://avater.png"
        />
      </label>
      <label>
        Password
        <input
          id="password"
          type="text"
          className="inputs"
          value={formData?.password}
          onChange={handleChange}
          placeholder="******"
        />
      </label>
      <label>Department </label>
      <select
        id="department_id"
        className="inputs"
        value={formData?.department_id}
        onChange={handleChange}
      >
        <option value="1">Hospitality</option>
        <option value="2">Human Resource</option>
        <option value="3">Support Desk</option>
        <option value="4">Design</option>
        <option value="5">Technical Support</option>
      </select>

      <label>
        Title
        <input
          id="title"
          type="text"
          className="inputs"
          value={formData?.title}
          placeholder="Managing Director"
        />
      </label>
      <span className="checkbox">
        Admin ?
        <input
          id="usertype"
          type="checkbox"
          checked={formData?.usertype === 1?true:false}
          onChange={handleChange}
        />
      </span>
      <button className="btn-submit">Update Info</button>
    </form>
  );
};

export default Update;
