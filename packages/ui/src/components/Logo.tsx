import { Image } from "antd";
import React from "react";

const Logo = ({ logo, name }) => {
  return (
    <>
      <Image
        alt={`https://cdn.thrico.network/${name}`}
        width={70}
        style={{ objectFit: "contain" }}
        height={50}
        src={`https://cdn.thrico.network/${logo}`}
      />
    </>
  );
};

export default Logo;
