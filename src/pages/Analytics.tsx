import React, { useEffect, useState } from "react";
import Welcomeinfo from "../components/cards/Welcomeinfo";
import { userInterface } from "../interfaces/interface";
import "react-circular-progressbar/dist/styles.css";
import { ReactSession } from "react-client-session";
import {
  Chart,
  SeriesTemplate,
  CommonSeriesSettings,
  Title,
  Font,
} from "devextreme-react/chart";
import { axiosRequest } from "../API/api";
import { requests } from "../API/requests";
import Usercard from "../components/cards/Usercard";

interface Analyticsprops {
  currentuser?: userInterface;
  setCurrentUser?(obj: userInterface): void;
}

const Analytics: React.FC<Analyticsprops> = ({
  currentuser,
  setCurrentUser,
}) => {
  const [loading, setIsLoading] = useState(false);
  const [data, setdata] = useState({
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
  });

  useEffect(() => {
    const getTimestamps = (id: number) => {
      try {
        axiosRequest.get(`${requests.gettimestamp}/${id}`).then((response) => {
          setdata(response.data);
          setIsLoading(true);
          if (Object.values(response.data).length > 1) {
            //  alert("Update successful")
          } else {
            alert("Employee Not Found");
          }
        });
      } catch (err) {
        console.error(err);
      }
    };

    getTimestamps(ReactSession.get("sessionUser")?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentuser]);

  const dataSource = [
    { day: "Monday", number: data?.monday },
    { day: "Tuesday", number: data?.tuesday },
    { day: "Wednesday", number: data?.wednesday },
    { day: "Thursday", number: data?.thursday },
    { day: "Friday", number: data?.friday },
  ];

  // {/* <CircularProgressbar value={8} maxValue={11} text={`${8 * 100}%`} /> */}
  return (
    <section className="analytics__view">
      <article className="left">
        <Welcomeinfo />
        <Usercard />
      </article>
      <article className="right">
        {loading && (
          <Chart id="chart" palette="Soft" dataSource={dataSource}>
            {/* <AdaptiveLayout height={200} width={200} /> */}
            <CommonSeriesSettings
              argumentField="day"
              valueField="number"
              type="bar"
              ignoreEmptyPoints={true}
            />
            <SeriesTemplate nameField="day" />
            <Title
              text="Weekly perfomance"
              subtitle={`${ReactSession.get("sessionUser")?.name}`}
            >
              <Font color="white" />
            </Title>
          </Chart>
        )}
      </article>
    </section>
  );
};

export default Analytics;
