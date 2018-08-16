import React from "react";
import Img from "../../assets/img/image-not-found.png";

const ImageNotFound = props => {
  return (
    <div>
      <img src={Img} alt="not found" />
    </div>
  );
};

export default ImageNotFound;
