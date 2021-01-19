import React from "react";

import styles from "../css/Station.module.css";

interface Station {
  name: string;
  frequency: string;
  image: string;
}

interface activeStation {
  stationOpen: boolean;
  stationOpenIndex: null | number;
}

interface Props {
  station: Station;
  stationIndex: number;
  onHandleDataStation: (stationData: activeStation) => void;
  activeStation: activeStation;
}

const Station: React.FC<Props> = ({ station, stationIndex, onHandleDataStation, activeStation }) => {
  //Checking if station needs to be opened or close and setting active station index
  const stationContainerClicked = () => {
    if (activeStation.stationOpen && activeStation.stationOpenIndex === stationIndex) {
      onHandleDataStation({ stationOpen: false, stationOpenIndex: stationIndex });
    } else {
      onHandleDataStation({ stationOpen: true, stationOpenIndex: stationIndex });
    }
  };

  //Class name for displaying station's image and buttons
  const stationDisplayClass =
    activeStation.stationOpenIndex === stationIndex && activeStation.stationOpen ? "" : styles.stationDisplayHidden;

  return (
    <div className={styles.container}>
      {/* Active station's image and buttons*/}
      <div className={`${styles.stationDisplay} ${stationDisplayClass}`}>
        <button className={styles.buttonMinus}></button>
        <div className={styles.stationImage} style={{ backgroundImage: `url("${station.image}")` }}></div>
        <button className={styles.buttonPlus}></button>
      </div>
      {/*Station's info container*/}
      <div
        className={styles.stationInfo}
        onClick={() => {
          stationContainerClicked();
        }}
      >
        <p className={styles.name}>{station.name}</p>
        <p className={styles.frequency}>{station.frequency}</p>
      </div>
    </div>
  );
};

export default Station;
