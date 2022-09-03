import React, { useState, useEffect, createContext,useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { axiosRequest } from '../API/api';
import {requests} from '../API/requests';
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


  
export const appContext = createContext<userInterface[] |null>(null);


const Main:React.FC = () => {
  const accUser = useContext(accContext);
    const [loading,setIsLoading] =useState(true);

    const [currentUser, setCurrentUser] = useState<userInterface>({});
  const [users, setUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  //local api link

  useEffect(() => {
    try{
    axiosRequest.get('/users')
    .then((res:any) =>setUsers(res.data))
    .then(()=>{
      //check if loged use is loaded with user info
      if(accUser !== undefined){
        setCurrentUser(accUser)
      }
    })
    .then(()=>setIsLoading(false))
  } catch (err) {
    console.error(err);
  }
    
    //setCurrentUser(acc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(users)

  //delete user
  const deleteUser = (id:number) => {
    try {
      let deluser = users.filter((user:userInterface) => user?.id !== id);
      setUsers(deluser);
      axiosRequest.delete(`/employee/${id}`)
      .then(()=>setCurrentUser({}))
      .then(()=>alert("User Deleted succesfully :)"))
    } catch (err) {
      console.error(err);
      alert("Task Failed :(");
    }
  };

  //post data to db
  const postData = (formData:userInterface) => {
    try {
      axiosRequest.post('/employees', formData)
     // .then(()=>setUsers([...users, formData]))
      .then(()=>alert("User Added succesfully :)"))
    } catch (err) {
      console.log(err);
      alert("Task Failed :(");
    }
  };

  //patch timestamp to db
  const postTimeStamp = (id:number, formData:userInterface) => {
    try {
      axiosRequest.patch(`/employees/${id}`, formData)
      // .then(()=>setUsers([...users, formData]))
    } catch (err) {
      console.log(err);
      alert("Task Failed :(");
    }
  };

  //update user details request
  const updateUser = (id:number, formData:userInterface) => {
    try {
      axiosRequest.patch(`employees/${id}`, formData)
      .then(()=>setUsers(users))
      .then(()=>alert("User Updated succesfully :)"))
    } catch (err) {
      console.log(err);
      alert("Task Failed :(");
    }
  };


  //search function
  function handleSearch(str:string) {
    setSearchTerm(str);

    if (searchTerm !== "") {
      const newList = users.filter((user) =>
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
  function filterUsers(str:string) {
    setSearchTerm(str);

    if (searchTerm !== "all") {
      const newList = users.filter((user) =>
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
    <appContext.Provider value={users}>
    <section className="container__main">
      <Header />
      <div className="view__main">
        <Routes>
          <Route
            path="dashboard"
            element={
              <Dashboard
        
              />
            }
          />
        </Routes>
        <Routes>
          <Route
            path="admin"
            element={
              <Admin
   
              />
            }
          >
            <Route
              path="Addnew"
              element={<AddNew />}
            />
            <Route
              path="/admin/"
              element={<AddNew />}
            />
            <Route
              path="update"
              element={
                <Update  />
              }
            />
          </Route>
        </Routes>
        <Routes>
          <Route
            path="analytics"
            element={
              <Analytics />
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