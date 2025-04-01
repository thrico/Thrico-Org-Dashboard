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

  const columnsEducation: TableColumnsType = [
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

  const columnsExperience: TableColumnsType = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Employment Type",
      dataIndex: "employmentType",
      key: "employmentType",
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

  const { profile, firstName, lastName, avatar, email, location } = data;

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Avatar",
      children: <Avatar src={`https://cdn.thrico.network/${avatar}`} />,
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
      label: "Location",
      children: (
        <p>{location?.name}</p>
      ),
    },

    // {
    //   span: 3,
    //   key: "4",
    //   label: "Education",
    //   children: (
    //     <Table
    //       dataSource={profile.education}
    //       columns={columnsEducation}
    //       pagination={false}
    //     />
    //   ),
    // },
    // {
    //   span: 3,
    //   key: "4",
    //   label: "Experience",
    //   children: (
    //     <Table
    //       dataSource={profile?.experience}
    //       columns={columnsExperience}
    //       pagination={false}
    //     />
    //   ),
    // },
  ];
  return (
    <Descriptions bordered layout="vertical" title="User Info" items={items} />
  );
};

export default UserInfo;
