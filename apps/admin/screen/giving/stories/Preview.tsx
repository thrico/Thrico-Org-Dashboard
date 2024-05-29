"use client";
import { CalendarOutlined } from "@ant-design/icons";
import { Avatar, Card, Flex, Space, Typography } from "antd";
import { isTypeSystemExtensionNode } from "graphql";
import moment from "moment";
import Image from "next/image";
import React from "react";

const Preview = ({ data }) => {
  return (
    <Card>
      <Flex style={{ width: "100%", height: 400, position: "relative" }}>
        <Image
          src={
            data?.cover
              ? `https://cdn.thrico.network/${data?.cover}`
              : "https://cdn.thrico.network/defaultEventCover.png"
          }
          alt="alt"
          layout="fill"
          objectFit="cover"
        />
      </Flex>

      <Space style={{ marginTop: 20 }} direction="vertical">
        <Typography.Title>{data?.title}</Typography.Title>

        <Space style={{ gap: 50 }}>
          {data?.user && (
            <Space>
              <Avatar src={data?.user?.alumni?.avatar}></Avatar>{" "}
              <Typography>
                {data?.user?.alumni?.firstName}
                {data?.user?.alumni?.lastName}
              </Typography>
            </Space>
          )}

          <Space>
            <CalendarOutlined style={{ fontSize: 20 }} />{" "}
            <Typography>
              Post On:{" "}
              {moment(data.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            </Typography>
          </Space>
        </Space>

        <Space style={{ marginTop: 10 }}>
          <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
        </Space>
      </Space>
    </Card>
  );
};

export default Preview;
