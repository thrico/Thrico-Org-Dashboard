import { DeleteTwoTone } from "@ant-design/icons";
import { Space } from "antd";

const DeleteButton = () => {
  return (
    <Space>
      <DeleteTwoTone
        twoToneColor="#eb2f96"
        style={{
          cursor: "pointer",
          padding: 10,
          backgroundColor: "#f5daea",
          borderRadius: "50%",
        }}
      />
    </Space>
  );
};

export default DeleteButton;
