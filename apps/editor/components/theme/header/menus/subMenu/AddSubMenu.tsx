import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import Sidebar from "../../Sidebar";

const { Option } = Select;
interface DataType {
  key: string;
  name: string;

  link: string;
}
const AddSubMenu = ({ dataSource, setDataSource }) => {
  const addMenu = (value: DataType) => {
    setDataSource([...dataSource, value]);
  };
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={showDrawer} icon={<PlusOutlined />}>
        Add Sub Menu
      </Button>
      <Drawer
        placement="left"
        title=""
        width={500}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Sidebar addMenu={addMenu} />
      </Drawer>
    </>
  );
};

export default AddSubMenu;
