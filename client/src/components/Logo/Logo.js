import React from "react";
import LogoImg from "../../assets/img/minilogo.png";

const Logo = props => {
  return (
    <div>
      <img src={LogoImg} alt="logo" width={props.width} />
    </div>
  );
};

export default Logo;
