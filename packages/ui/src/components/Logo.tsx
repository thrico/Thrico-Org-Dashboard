import { Image } from "antd";
import React from "react";

const Logo = () => {
  return (
    <Image
      alt="Alumni Thrive Logo"
      width={100}
      style={{ objectFit: "contain" }}
      height={100}
      src="/logo.png"
    />
  );
};

export default Logo;
