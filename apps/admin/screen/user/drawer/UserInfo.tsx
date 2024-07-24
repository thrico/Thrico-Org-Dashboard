import {
  Avatar,
  Descriptions,
  DescriptionsProps,
  Table,
  TableColumnsType,
} from "antd";
import moment from "moment";
import React from "react";

const UserInfo = ({ data }) => {
  const columns: TableColumnsType = [
    {
      title: "Degree",
      dataIndex: "degree",
      key: "degree",
    },
    {
      title: "School",
      dataIndex: "school",
      key: "school",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (props) => (
        <>
          {moment(props[0]).format("MMMM Do YYYY")} -{" "}
          {moment(props[1]).format("MMMM Do YYYY")}
        </>
      ),
    },
  ];
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const { profile, firstName, lastName, avatar, email } = data;

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Avatar",
      children: <Avatar src={avatar} />,
    },
    {
      key: "1",
      label: "Full Name",
      children: (
        <p>
          {firstName} {lastName}
        </p>
      ),
    },

    {
      key: "1",
      label: "email",
      children: <p>{email}</p>,
    },
    {
      key: "2",
      label: "Phone",
      children: (
        <p>
          +{profile.phone?.areaCode}-{profile.phone?.phoneNumber}
        </p>
      ),
    },
    {
      key: "3",
      label: "country",
      children: <p>{profile.country}</p>,
    },
    {
      key: "5",
      label:
        "What, in your opinion, has been your greatest achievements so far? (Not publicly visible)",
      children: (
        <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>
      ),
    },

    {
      span: 3,
      key: "4",
      label: "Education",
      children: (
        <Table
          dataSource={profile.education}
          columns={columns}
          pagination={false}
        />
      ),
    },
    {
      span: 3,
      key: "4",
      label: "Experience",
      children: (
        <Table
          dataSource={profile?.experience}
          columns={columns}
          pagination={false}
        />
      ),
    },
  ];
  return (
    <Descriptions bordered layout="vertical" title="User Info" items={items} />
  );
};

export default UserInfo;
