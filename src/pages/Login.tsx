import { Outlet } from "react-router-dom";

const Login:React.FC =()=>{
    return (
        <section id="login">
              <div className="container__login">
                <h2>
                  Clock-Me<span>System</span>
                </h2>
                  <Outlet />
                </div>
            </section>
    )
}
export default Login;