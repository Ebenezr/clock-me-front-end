import React, { useState, useEffect} from "react";
import { axiosRequest } from "../../API/api";
import { requests } from "../../API/requests";
import { userInterface } from "../../interfaces/interface";

const AddNew:React.FC =() =>{
  //hold user data
  const [formData, setFormData] = useState<userInterface>();
  const [loading,setIsLoading] =useState(true);
//   const userRef = useRef(null);
  //funtion to generate staffid
  // function staffIdGen() {
  //   const number = Math.floor(1000 + Math.random() * 9000);
  //   return `CM-${number}`;
  // }
  //fuction to generate profile pictures
  function proPicGen() {
    let imgurl = "https://picsum.photos/";
    const number = Math.floor(100 + Math.random() * 10);
    return `${imgurl}/${number}`;
  }
  //set focus
  useEffect(() => {
    // userRef.current.focus();
  }, []);

  //hangle change event
  const handleChange = (event:any) => {
    const key = event.target.id;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setFormData({ ...formData, [key]: value });
  };

  //handle form submission
  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    
    axiosRequest.post(requests.employeesadd, formData)
    .then(response =>  {
      console.log(response?.data)
      if(Object.values(response.data).length > 1) {
          alert("Registration successful")

      }else{
        alert("Employee already exists");
      }      
}).then(() => setIsLoading(false))  

}



  return (
    <form className="addnew" onSubmit={handleSubmit}>
      <label className="required">Name</label>
      <input
        required
        id="name"
        type="text"
        // ref={userRef}
        className="inputs"
        value={formData?.name}
        onChange={handleChange}
        placeholder="Jon Doe"
      />

      <label className="required">UserName </label>
      <input
        required
        id="username"
        type="text"
        className="inputs"
        value={formData?.username}
        onChange={handleChange}
        placeholder="ebbe"
      />
        <label className="required">Email </label>
      <input
        required
        id="email"
        type="email"
        className="inputs"
        value={formData?.email}
        onChange={handleChange}
        placeholder="johndoe@hotmail.com"
      />

      <label className="required">Avatar </label>
      <input
        id="avatar"
        type="text"
        className="inputs"
        value={formData?.avatar}
        onChange={handleChange}
        placeholder="https://avater.png"
      />

      <label>Department </label>
      <select
        id="department"
        className="inputs"
        value={formData?.department}
        onChange={handleChange}
      >
        <option value="1">Hospitality</option>
        <option value="2">Human Resource</option>
        <option value="3">Support Desk</option>
        <option value="4">Design</option>
        <option value="5">Technical Support</option>
      </select>

      <label className="required">Password </label>
      <input
        required
        id="password"
        type="text"
        className="inputs"
        value={formData?.password}
        onChange={handleChange}
        placeholder="******"
      />
      <span className="checkbox">
        Admin ?
        <input
          id="admin"
          type="checkbox"
          checked={formData?.usertype}
          onChange={handleChange}
        />
      </span>
      <button className="btn-submit">Create new</button>
    </form>
  );
}

export default AddNew;
