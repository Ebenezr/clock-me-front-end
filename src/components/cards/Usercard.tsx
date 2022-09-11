import { VscBellDot } from "react-icons/vsc";
import { IoTimerSharp } from "react-icons/io5";
import { BsWalletFill, BsFillBarChartFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { axiosRequest } from "../../API/api";
import { requests } from "../../API/requests";
import { userInterface } from "../../interfaces/interface";
import { ReactSession } from "react-client-session";

interface UsercardProps {
  className?: string;
  currentuser?: userInterface;
}

const Usercard: React.FC<UsercardProps> = ({ currentuser }) => {
  const [useraccount, setuseracc] = useState<userInterface>();
  const [loading, setIsLoading] = useState(false);
  const [salary, setSalary] = useState<number>();
  const [hours, setHours] = useState<number>();
  const [avghours, setAvgHours] = useState<number>();
  useEffect(() => {
    //console.log(ReactSession.get("sessionUser"));
    setuseracc(ReactSession.get("sessionUser"));
    const getsalary = (id: number = 1) => {
      try {
        axiosRequest.get(`${requests.getsalary}/${id}`).then((response) => {
          setSalary(response.data);
          setIsLoading(true);
        });
      } catch (err) {
        console.error(err);
      }
    };
    const gethours = (id: number = 1) => {
      try {
        axiosRequest.get(`${requests.gettotalhours}/${id}`).then((response) => {
          setHours(response.data);
          setIsLoading(true);
        });
      } catch (err) {
        console.error(err);
      }
    };
    const getavghours = (id: number = 1) => {
      try {
        axiosRequest
          .get(`${requests.getavaragetime}/${id}`)
          .then((response) => {
            setAvgHours(response.data);
            setIsLoading(true);
          });
      } catch (err) {
        console.error(err);
      }
    };
    getavghours(useraccount?.id);
    gethours(useraccount?.id);
    getsalary(useraccount?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <article className="usercard">
      <div className="user__card">
        <span>
          <BsFillBarChartFill color="#7380ec" className="myReact-icons" />
        </span>
        <p>{hours}</p>
        <small>Total hours</small>
      </div>

      <div className="user__card">
        <span>
          <BsWalletFill color="#41f1b6" className="myReact-icons" />
        </span>
        <p>
          {salary?.toLocaleString("en-US", {
            style: "currency",
            currency: "Ksh",
          })}
        </p>
        <small>Wallet</small>
      </div>
      <div className="user__card">
        <span>
          <IoTimerSharp color="#ff7782" className="myReact-icons" />
        </span>
        <p>{avghours}</p>
        <small>Avarage Time</small>
      </div>
      <div className="user__card">
        <span>
          <VscBellDot color="#ffbb55" className="myReact-icons" />
        </span>
        <p>5</p>
        <small>Notifications</small>
      </div>
    </article>
  );
};
export default Usercard;
