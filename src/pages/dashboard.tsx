import React from "react";
import Welcomeinfo from "../components/cards/Welcomeinfo";
import Starts from "../components/cards/Starts";
import Searchbar from "../components/forms/Searchbar";
import Employeecard from "../components/cards/Employeecard";
import { useContext } from "react";
import { userInterface } from "../interfaces/interface";
import { appContext } from "./Main";

interface dashProps {
  filterUsers(str: string): void;
}

const Dashboard: React.FC<dashProps> = ({ filterUsers }) => {
  const employees = useContext(appContext);
  //{avatar,department}=employees;
  const inputEl = React.useRef<HTMLInputElement>(null);
  const handleFilter = () => {
    if (null !== inputEl.current) {
      //filterUsers(inputEl.current.value);
    }
  };

  return (
    <section className="dashboard__view">
      <article className="left">
        <Welcomeinfo />
        <Starts />
        <Searchbar filterUsers={filterUsers} />
        <div className="users-list">
          <div className="user-title">
            <h3>Employees </h3>
            <select
              //   type="option"
              //   ref={inputEl}
              onChange={handleFilter}
            >
              <option value="all">Filter</option>
              <option value="System Design">System Design</option>
              <option value="sales">Sales</option>
              <option value="hospitality">Hospitality</option>
            </select>
          </div>
        </div>
      </article>
      <article className="right">
        {employees?.map((employee: userInterface) => (
          <Employeecard key={employee.id} employee={employee} />
        ))}
      </article>
    </section>
  );
};

export default Dashboard;
