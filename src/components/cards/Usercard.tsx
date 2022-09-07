import { VscBellDot } from "react-icons/vsc";
import { IoTimerSharp } from "react-icons/io5";
import { BsWalletFill } from "react-icons/bs";
const Usercard: React.FC = () => {
  return (
    <article className="usercard">
      <div className="user__card">
        <span>icon</span>
        <p>name</p>
        <small>department</small>
      </div>

      <div className="user__card">
        <span>
          <BsWalletFill size="3.5rem" color="#41f1b6" />
        </span>
        <p>54645</p>
        <small>Wallet</small>
      </div>
      <div className="user__card">
        <span>
          <IoTimerSharp size="3.5rem" color="#ff7782" />
        </span>
        <p>54645</p>
        <small>Avarage Time</small>
      </div>
      <div className="user__card">
        <span>
          <VscBellDot size="3.5rem" color="#ffbb55" />
        </span>
        <p>5</p>
        <small>Notifications</small>
      </div>
    </article>
  );
};
export default Usercard;
