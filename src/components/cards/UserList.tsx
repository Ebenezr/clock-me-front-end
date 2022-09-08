import React, { useContext, useState } from "react";
import { userInterface } from "../../interfaces/interface";
import { appContext } from "../../pages/Main";
import { getDepartment } from "./Userinfo";

interface UserListProps {
  renderUser(id: number): void;
}
const UserList: React.FC<UserListProps> = ({ renderUser }) => {
  const employees = useContext(appContext);
  //const [users, setusers] = useState<userInterface[]>([]);
  //setusers(employees);
  return (
    <div className="results">
      {employees?.map((list) => (
        <span
          key={list?.id}
          onClick={() => {
            renderUser(list?.id);
          }}
        >
          <h4>{list?.name}</h4>
          <small>{getDepartment(list?.department_id)}</small>
        </span>
      ))}
    </div>
  );
};

export default UserList;
