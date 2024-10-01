import React, { useState } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  PlusOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Col,
  DatePicker,
  Descriptions,
  DescriptionsProps,
  Drawer,
  Form,
  Image,
  Input,
  Row,
  Select,
  Space,
  Tag,
} from "antd";
import { DataType } from "./ts-types";
import moment from "moment";

const { Option } = Select;

const Actions = ({ data }: { data: DataType }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Cover",
      children: (
        <Image
          width={100}
          height={100}
          style={{ objectFit: "cover" }}
          src={`https://cdn.thrico.network/${data.cover}`}
        />
      ),
    },
    {
      key: "2",
      span: 2,
      label: "Group Name",
      children: data.title,
    },
    {
      key: "4",
      label: "Date of Creation",
      children: (
        <> {moment(data.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</>
      ),
    },
    {
      key: "3",
      span: 2,
      label: "About Group",
      children: data.about,
    },

    {
      key: "7",

      label: "Theme",
      children: <Tag color={"geekblue"}>{data?.theme?.title}</Tag>,
    },
    {
      key: "8",
      span: 2,
      label: "Interest",
      children: <Tag color={"geekblue"}>{data?.interest?.title}</Tag>,
    },

    {
      key: "8",
      span: 1,
      label: "Privacy",
      children: <> {data?.setting.groupType}</>,
    },
    {
      key: "8",
      span: 1,
      label: "Group Joining Condition",
      children: <>{data?.setting?.joiningCondition} </>,
    },
    {
      key: "8",
      span: 1,
      label: "Group Location",
      children: <>{data?.setting?.groupType} </>,
    },
  ];

  return (
    <>
      <Button onClick={showDrawer} icon={<DownOutlined />}>
        Actions
      </Button>
      <Drawer
        title="Group Info"
        width={900}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button icon={<StopOutlined />} danger>
              Block
            </Button>
            <Button icon={<CloseCircleOutlined />}>Reject</Button>
            <Button
              icon={<CheckCircleOutlined />}
              type="primary"
              onClick={onClose}
            >
              Approve
            </Button>
          </Space>
        }
      >
        <Descriptions title="" bordered items={items} />
      </Drawer>
    </>
  );
};

export default Actions;
