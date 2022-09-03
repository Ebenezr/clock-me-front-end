import React, { useState, useEffect, createContext } from "react";
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


  
  export const appContext = createContext<userInterface[] |null>(null);


const Main:React.FC = () => {
    const [loading,setIsLoading] =useState(true);

    const [currentUser, setCurrentUser] = useState<userInterface>({
    name: "",
    username: "",
    password: "",
    admin: false,
    staffid: "",
    department: "",
    avatar: "",
    timestamp: [],
  });
  const [users, setUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  //local api link

  useEffect(() => {
    axiosRequest.get('/users')
    .then((res:any) =>setUsers(res.data))
    .then(()=>setIsLoading(false))
    .catch((err:any)=>console.error(err))
    
    
    //setCurrentUser(acc);
  }, []);

  console.log(users)

//   //delete user
//   const deleteUser = async (id:number) => {
//     try {
//       let deluser = users.filter((user) => user.id !== id);
//       setUsers(deluser);
//       await axios.delete(`${url_local}/${id}`);
//       setCurrentUser("");
//       alert("User Deleted succesfully :)");
//     } catch (err) {
//       console.error(err);
//       alert("Task Failed :(");
//     }
//   };

//   //post data to db
//   const postData = async (formData) => {
//     try {
//       await axios.post(url_local, formData);
//       setUsers([...users, formData]);
//       alert("User Added succesfully :)");
//     } catch (err) {
//       console.log(err);
//       alert("Task Failed :(");
//     }
//   };
  //patch timestamp to db
  const postTimeStamp = async (id:number, formData:userInterface) => {
    // try {
    //   await axios.patch(`${url_local}/${id}`, formData);
    //   setUsers([...users, formData]);
    // } catch (err) {
    //   console.log(err);
    //   alert("Task Failed :(");
    // }
  };

//   //update user details request
//   const updateUser = async (id, formData) => {
//     try {
//       await axios.patch(`${url_local}/${id}`, formData);
//       setUsers(users);
//       alert("User Updated succesfully :)");
//     } catch (err) {
//       console.log(err);
//       alert("Task Failed :(");
//     }
//   };
  //add new employee

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
              element={<AddNew  />}
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
