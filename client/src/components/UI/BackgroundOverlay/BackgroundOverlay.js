import React from "react";

const BackgroundOverlay = props => {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.8)",
          zIndex: "-1"
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${props.url})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: "-2"
        }}
      />
    </div>
  );
};

export default BackgroundOverlay;
