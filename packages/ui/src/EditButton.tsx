import { EditTwoTone } from "@ant-design/icons";
import { Space } from "antd";
import React from "react";

interface props {
  isDisabled: boolean;
}
const EditButton = ({ isDisabled }: props) => {
  return (
    <Space>
      <EditTwoTone
        style={{
          cursor: "pointer",
          padding: 10,
          backgroundColor: "#caddf769",
          borderRadius: "50%",
        }}
      />
    </Space>
  );
};

export default EditButton;
