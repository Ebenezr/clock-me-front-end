import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import Aside from "./components/nav/Aside";
import { userInterface } from "./interfaces/interface";
import Main from "./pages/Main";
import "./scss/style.scss";

export const accContext = createContext<userInterface | undefined>(undefined);
const App: React.FC = () => {
  const [acc, setAcc] = useState<userInterface>();
  const navigate = useNavigate();
  //protect app component
  const [authenticated, setauthenticated] = useState<boolean>(false);

  useEffect(() => {
    const loggedUser: userInterface = JSON.parse(
      localStorage.getItem("name") || "{}"
    );
    const auth: boolean = JSON.parse(
      localStorage.getItem("authenticated") || ""
    );
    if (auth) {
      setauthenticated(auth);
      setAcc(loggedUser);
    } else {
      navigate("/");
      // Redirect if not loggedin
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!authenticated) {
    navigate("/");
  }

  return (
    <accContext.Provider value={acc}>
      <main className="dark-mode">
        <Aside />
        <Main authenticated={authenticated} setauth={setauthenticated} />
      </main>
    </accContext.Provider>
  );
};

export default App;
