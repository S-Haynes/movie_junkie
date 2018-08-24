import React from "react";
import JunkieLogo from "../Logo/YouAJunkie";
import InfoControls from "../../containers/InfoControls/InfoControls";

const Home = props => {
  return (
    <div>
      <div style={{ width: "100%", height: "70vh", position: "relative" }}>
        <JunkieLogo />
      </div>
      <div className="mt-4">
        <InfoControls />
      </div>
    </div>
  );
};

export default Home;
