import { Image } from "antd";
import React from "react";

const Logo = ({ logo, name }) => {
  return (
    <>
      <Image
        preview={false}
        alt={`https://cdn.thrico.network/${name}`}
        width={60}
        style={{ objectFit: "contain" }}
        height={50}
        src={`https://cdn.thrico.network/${logo}`}
      />
    </>
  );
};

export default Logo;
