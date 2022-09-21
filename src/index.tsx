import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signin from "./components/forms/signin";
import PasswordRecovery from "./components/forms/passwordrecovery";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />}>
        <Route path="///" element={<Signin />} />
        <Route path="recover" element={<PasswordRecovery />} />
        <Route path="signin" element={<Signin />} />
      </Route>

      <Route path="/login" element={<Login />}>
        <Route path="/login/" element={<Signin />} />
        <Route path="signin" element={<Signin />} />
        <Route path="recover" element={<PasswordRecovery />} />
      </Route>
      <Route path="/home/*" element={<App />} />
    </Routes>
  </Router>
);
