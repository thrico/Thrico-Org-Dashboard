import { PlusCircleTwoTone } from "@ant-design/icons";
import { Space } from "antd";

const AddButton = () => {
  return (
    <Space>
      <PlusCircleTwoTone
        twoToneColor="#013DC4"
        style={{
          cursor: "pointer",
          fontSize: 25,
          strokeWidth: 5,
          borderRadius: "50%",
        }}
      />
    </Space>
  );
};

export default AddButton;
