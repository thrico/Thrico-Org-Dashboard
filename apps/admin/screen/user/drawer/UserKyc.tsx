import {
  Avatar,
  Descriptions,
  DescriptionsProps,
  Table,
  TableColumnsType,
} from "antd";
import moment from "moment";
import React from "react";

const UserKyc = ({ data }) => {
  const { referralSource, comment, affliction } = data;

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Referral Source",
      children: <>{referralSource?.map((set) => <>{set}</>)}</>,
    },
    {
      key: "1",
      label: "Affliction",
      children: <>{affliction?.map((set) => <>{set}</>)}</>,
    },

    {
      key: "1",
      label: "Comment",
      children: <p>{comment}</p>,
    },
  ];
  return (
    <Descriptions bordered layout="vertical" title="User Kyc" items={items} />
  );
};

export default UserKyc;
