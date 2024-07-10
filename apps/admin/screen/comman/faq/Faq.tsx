"use client";
import { Card, Space } from "antd";
import React from "react";
import AllFaq from "./AllFaq";
import AddFaq from "./AddFaq";
import Sort from "./sort/Sort";
import { getModuleFaq } from "../../../graphql/actions/faq";

const Faq = ({ type }) => {
  const { data, loading } = getModuleFaq({
    variables: {
      input: {
        module: type,
      },
    },
  });
  return (
    <Card
      extra={
        <Space>
          {!loading && <Sort data={data?.getModuleFaq} type={type} />}

          <AddFaq type={type} />
        </Space>
      }
      title="FAQ"
    >
      <AllFaq loading={loading} data={data?.getModuleFaq} type={type} />
    </Card>
  );
};

export default Faq;
