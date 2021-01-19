import React, { useState } from "react";
import axios from "axios";
import Station from "./Station";
import styles from "../css/Widget.module.css";

interface stationInterface {
  name: string;
  frequency: string;
  image: string;
}

interface activeStationInterface {
  stationOpen: boolean;
  stationOpenIndex: null | number;
}

const StationsWidget: React.FC = () => {
  const [stations, setStations] = useState<stationInterface[]>();
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  const [activeStation, setActiveStation] = useState<activeStationInterface>({ stationOpen: false, stationOpenIndex: null });

  //HTTP request to get stations data
  React.useEffect(() => {
    const stationsUrl = "/data/stations.json";
    axios
      .get<stationInterface[]>(stationsUrl)
      .then((response) => {
        setStations(response.data);
        setLoading(false);
      })
      //Error checking
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  //Modify state for currently clicked station
  const handleDataStation = (stationData: activeStationInterface) => {
    setActiveStation(stationData);
  };

  return (
    <div className={styles.container}>
      {/* Station widget top section */}
      <div className={styles.topSection}>
        <button className={styles.buttonBack}></button>
        <p>STATIONS</p>
        <button className={styles.buttonSwitch}></button>
      </div>
      {/* Station widget middle section to display stations list*/}
      <div className={styles.middleSection}>
        {loading && <h1 className={styles.loadingText}>Loading...</h1>}
        {stations &&
          stations.map((station, index) => (
            <Station
              key={index}
              stationIndex={index}
              station={{ name: station.name, frequency: station.frequency, image: station.image }}
              onHandleDataStation={handleDataStation}
              activeStation={activeStation}
            />
          ))}
      </div>
      {/* Station widget bottom section to display which station is currently playing */}
      <div className={styles.bottomSection}>
        {activeStation.stationOpenIndex !== null && activeStation.stationOpen ? (
          <div className={styles.text}>
            <p className={styles.yellowText}>CURRENTLY PLAYING</p>
            <p className={styles.stationPlaying}>{stations && stations[activeStation.stationOpenIndex].name}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default StationsWidget;
