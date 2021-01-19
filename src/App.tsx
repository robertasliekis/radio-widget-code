import React from "react";
import styles from "./css/App.module.css";

import StationsWidget from "./components/StationsWidget";

const App = () => {
  return (
    <div className={styles.container}>
      <StationsWidget />
    </div>
  );
};

export default App;
