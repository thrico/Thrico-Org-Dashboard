import { Image } from "antd";
import React from "react";

const Logo = ({ logo, name }) => {
  return (
    <>
      <Image
        alt={`https://thrico.blr1.cdn.digitaloceanspaces.com/${name}`}
        width={70}
        style={{ objectFit: "contain" }}
        height={50}
        src={`https://thrico.blr1.cdn.digitaloceanspaces.com/${logo}`}
      />
    </>
  );
};

export default Logo;
