import React, { useState, useEffect } from "react";
import { axiosRequest } from "../../API/api";
import { requests } from "../../API/requests";
import { userInterface } from "../../interfaces/interface";

export interface AddnewProps {
  setUsers(arr: userInterface[]): void;
  users: userInterface[];
  setCurrentUser(userInterface): void;
}
const AddNew: React.FC<AddnewProps> = ({ setUsers, users, setCurrentUser }) => {
  const [status, setStatus] = useState<boolean>(null);
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

  //set focus
  useEffect(() => {
    //generate random user profile picture
    const proPicGen = (): string => {
      let imgurl = "https://picsum.photos/";
      const number = Math.floor(300 + Math.random() * 10);
      return `${imgurl}/${number}`;
    };
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

    axiosRequest.post(requests.employeesadd, formData).then((response) => {
      if (Object.values(response?.data).length === 1) {
        setStatus(false);
        setTimeout(() => {
          setStatus(null);
        }, 2500);
      } else {
        setStatus(true);
        setTimeout(() => {
          setStatus(null);
        }, 2500);
        setCurrentUser(response.data);
        setUsers([...users, formData]);
        setFormData({
          name: "",
          email: "",
          username: "",
          password: "",
          gender: "female",
          title: "",
          department_id: 1,
          usertype: 0,
          avatar: "",
        });
      }
    });
  };

  return (
    <form className="addnew" onSubmit={handleSubmit}>
      {status ? (
        <div className="form__status active">Employee Added Succesfuly</div>
      ) : status === false ? (
        <div className="form__status">Employee already Exist</div>
      ) : null}
      <label className="required">Name</label>
      <input
        required
        id="name"
        type="text"
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
