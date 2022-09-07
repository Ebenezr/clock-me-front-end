import React, { useState, useEffect, createContext, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { axiosRequest } from "../API/api";
import { requests } from "../API/requests";
import Footer from "../components/Footer";
import AddNew from "../components/forms/AddNew";
import Update from "../components/forms/Update";
import Header from "../components/Header";
import { userInterface } from "../interfaces/interface";
import Admin from "./Admin";
import Analytics from "./Analytics";
import Dashboard from "./dashboard";
import Timecard from "./Timecard";
import { accContext } from "../App";

export const appContext = createContext<userInterface[] | null>(null);

export interface MainProps {
  authenticated: boolean;
  setauth(auth: boolean): void;
}

const Main: React.FC<MainProps> = ({ authenticated, setauth }) => {
  const accUser = useContext(accContext);
  const [loading, setIsLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState<userInterface>({});
  const [users, setUsers] = useState<userInterface[]>([]);
  const [searchResult, setSearchResult] = useState<userInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  //local api link

  useEffect(() => {
    try {
      axiosRequest
        .get(requests.fetchEmployees)
        .then((res: any) => setUsers(res.data))
        .then(() => {
          //check if loged use is loaded with user info
          if (accUser !== undefined) {
            setCurrentUser(accUser);
          }
        })
        .then(() => setIsLoading(false));
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //delete user
  const deleteUser = (id: number): void => {
    try {
      let deluser = users?.filter((user: userInterface) => user?.id !== id);
      setUsers(deluser);
      axiosRequest.delete(`${requests.deleteuser}/${id}`).then((response) => {
        if (Object.values(response.data).length > 1) {
          setCurrentUser({});
          alert("User Deleted succesfully :)");
        } else {
          alert("Task Failed :(");
        }
      });
    } catch (err) {
      console.error(err);
      alert("Task Failed :(");
    }
  };

  //patch timestamp to db
  const postTimeStamp = (id: number, formData: userInterface) => {
    try {
      axiosRequest.patch(`/employees/${id}`, formData);
      // .then(()=>setUsers([...users, formData]))
    } catch (err) {
      console.log(err);
      alert("Task Failed :(");
    }
  };

  //search function
  function handleSearch(str: string) {
    setSearchTerm(str);

    if (searchTerm !== "") {
      const newList = users?.filter((user) =>
        Object.values(user)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setSearchResult(newList);

      return searchResult;
    }
    setSearchResult(users);
  }

  //filter function
  function filterUsers(str: string) {
    setSearchTerm(str);

    if (searchTerm !== "all") {
      const newList = users?.filter((user) =>
        Object.values(user)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setSearchResult(newList);

      return searchResult;
    }
    setSearchResult(users);
  }

  return (
    <appContext.Provider value={searchTerm.length < 1 ? users : searchResult}>
      <section className="container__main">
        <Header authenticated={authenticated} setauth={setauth} />
        <div className="view__main">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
          <Routes>
            <Route
              path="admin"
              element={
                <Admin
                  currentuser={currentUser}
                  setCurrentUser={setCurrentUser}
                  filterUsers={filterUsers}
                  deleteUser={deleteUser}
                />
              }
            >
              <Route path="Addnew" element={<AddNew />} />
              <Route path="/admin/" element={<AddNew />} />
              <Route
                path="update"
                element={
                  <Update
                    currentuser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />
                }
              />
            </Route>
          </Routes>
          <Routes>
            <Route
              path="analytics"
              element={
                <Analytics
                  currentuser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
          </Routes>
          <Routes>
            <Route
              path="timecard"
              element={
                <Timecard
                  currentuser={currentUser}
                  setCurrentUser={setCurrentUser}
                  postTimeStamp={postTimeStamp}
                  filterUsers={filterUsers}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
      </section>
    </appContext.Provider>
  );
};

export default Main;
