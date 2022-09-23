import React, { useEffect, useState } from "react";
import { axiosRequest } from "../../API/api";
import { requests } from "../../API/requests";
import { userInterface } from "../../interfaces/interface";

interface Updateprops {
  currentuser: userInterface;
  setCurrentUser(obj: userInterface): void;
  setUsers(arr: userInterface[]): void;
  users: userInterface[];
}

const Update: React.FC<Updateprops> = ({
  currentuser,
  setCurrentUser,
  setUsers,
  users,
}) => {
  const [status, setStatus] = useState<boolean>(null);
  //hold user data
  const [formData, setFormData] = useState<userInterface>({
    name: "",
    email: "",
    username: "",
    password: "",
    gender: "male",
    title: "",
    department_id: 1,
    avatar: "",
    usertype: 0,
  });
  //set focus
  useEffect(() => {
    setFormData(currentuser);
  }, [currentuser]);
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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosRequest
      .patch(`${requests.updateinfo}/${currentuser.id}`, formData)
      .then((response) => {
        if (Object.values(response.data).length > 1) {
          setCurrentUser(response.data);
          setStatus(true);
          setTimeout(() => {
            setStatus(null);
          }, 2500);
          axiosRequest
            .get(requests.fetchEmployees)
            .then((res: any) => setUsers(res.data));
        } else {
          setStatus(false);
          setTimeout(() => {
            setStatus(null);
          }, 2500);
        }
      });
  };

  return (
    <form className="addnew" onSubmit={handleSubmit}>
      {status ? (
        <div className="form__status active">Information Updated</div>
      ) : status === false ? (
        <div className="form__status">Error while Uptating</div>
      ) : null}
      <div className="form-group">
        <label>Name</label>
        <input
          required
          id="name"
          type="text"
          className="inputs"
          value={formData?.name}
          onChange={handleChange}
          placeholder="Jon Doe"
        />
      </div>{" "}
      <div className="form-group">
        <label>UserName </label>
        <input
          required
          id="username"
          type="text"
          className="inputs"
          value={formData?.username}
          onChange={handleChange}
          placeholder="ebbe"
        />
      </div>
      <div className="form-group">
        <label>Email </label>
        <input
          required
          id="email"
          type="email"
          className="inputs"
          value={formData?.email}
          onChange={handleChange}
          placeholder="name@mail.com"
        />
      </div>
      <div className="form-group">
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
      </div>
      <div className="form-group">
        <label>Avatar </label>
        <input
          id="avatar"
          type="text"
          className="inputs"
          value={formData?.avatar}
          onChange={handleChange}
          placeholder="https://avater.png"
        />
      </div>
      <div className="form-group">
        <label>Password </label>
        <input
          id="password"
          type="text"
          className="inputs"
          value={formData?.password}
          onChange={handleChange}
          placeholder="******"
        />
      </div>
      <div className="form-group">
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
      </div>
      <div className="form-group">
        <label>Title</label>
        <input
          id="title"
          type="text"
          className="inputs"
          value={formData?.title}
          onChange={handleChange}
          placeholder="Managing Director"
        />
      </div>
      <span className="checkbox">
        Admin ?
        <input
          id="usertype"
          type="checkbox"
          checked={formData?.usertype === 1 ? true : false}
          onChange={handleChange}
        />
      </span>
      <button className="btn-submit">Update Info</button>
    </form>
  );
};

export default Update;
