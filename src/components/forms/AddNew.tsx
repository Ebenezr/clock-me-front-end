import React, { useState, useEffect } from "react";
import { axiosRequest } from "../../API/api";
import { requests } from "../../API/requests";
import { userInterface } from "../../interfaces/interface";

const AddNew: React.FC = () => {
  //hold user data
  const [formData, setFormData] = useState<userInterface>({
    name: "",
    email: "",
    username: "",
    password: "",
    gender: "",
    title: "",
    department_id: 0,
    avatar: "",
    usertype: 0,
  });
  const [loading, setIsLoading] = useState(true);

  function proPicGen(): string {
    let imgurl = "https://picsum.photos/";
    const number = Math.floor(100 + Math.random() * 10);
    return `${imgurl}/${number}`;
  }
  //set focus
  useEffect(() => {
    setFormData({ ...formData, avatar: proPicGen() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //hangle change event
  const handleChange = (event: any) => {
    const key = event.target.id;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
          ? 1
          : 0
        : event.target.id === "department_id"
        ? (event.target.value = parseInt(event.target.value))
        : event.target.value;

    setFormData({ ...formData, [key]: value });
  };

  //handle form submission
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    axiosRequest
      .post(requests.employeesadd, formData)
      .then((response) => {
        if (Object.values(response?.data).length === 1) {
          return alert("Employee already exists");
        } else {
          alert("Registration successful");
        }
      })
      .then(() => setIsLoading(false));
  };

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
        placeholder="name@mail.com"
      />

      <label>Gender </label>
      <select
        id="gender"
        className="inputs"
        value={formData?.gender}
        onChange={handleChange}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

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

      <label className="required">Title </label>
      <input
        id="title"
        type="text"
        className="inputs"
        value={formData?.title}
        onChange={handleChange}
        placeholder="Product Manager"
      />

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
        <input id="usertype" type="checkbox" onChange={handleChange} />
      </span>
      <button className="btn-submit">Register Employee</button>
    </form>
  );
};

export default AddNew;
