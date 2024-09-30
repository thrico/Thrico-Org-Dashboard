"use client";

import { Button, Card, Flex, Form, Space, Typography, message } from "antd";
import React, { useState } from "react";
import AppearanceForm from "./Form";
import { changeThemeColor } from "../../../graphql/actions";

const Appearance = () => {
  const [change, { loading }] = changeThemeColor({
    onCompleted() {
      message.success("Success");
    },
  });

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const theme = [
    {
      img: "https://thrico.blr1.cdn.digitaloceanspaces.com/ae669a89-0c65-46db-b14b-72d1c7dd46d6.svg",
      color: "#1677FF",
    },

    {
      img: "https://thrico.blr1.cdn.digitaloceanspaces.com/3e899b2b-4eb4-4771-a7fc-14c7ff078aed.svg",
      color: "#00B96B",
    },

    {
      img: "https://thrico.blr1.cdn.digitaloceanspaces.com/ed9b04e8-9b8d-4945-8f8a-c8fc025e846f.svg",
      color: "#ED4192",
    },
    {
      img: "https://thrico.blr1.cdn.digitaloceanspaces.com/original.svg",
      color: "#1890ff",
    },
    {
      img: "https://thrico.blr1.cdn.digitaloceanspaces.com/0f93c777-5320-446b-9bb7-4d4b499f346d.svg",
      color: "#dddddd",
    },
  ];

  const [colorPrimary, setColorPrimary] = useState("#00b96b");

  const [borderRadius, setBorderRadius] = useState(2);
  const [containerColor, setContainerColor] = useState("#f6ffed");
  const onFinish = () => {
    change({
      variables: {
        input: {
          borderRadius: borderRadius,
          colorBgContainer: containerColor,
          colorPrimary: colorPrimary,
        },
      },
    });
  };
  return (
    <Flex style={{ width: "100%" }} align="center" vertical>
      <Typography.Title>Customize Theme</Typography.Title>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          "input-number": 3,
          "checkbox-group": ["A", "B"],
          rate: 3.5,
          "color-picker": null,
        }}
        style={{ width: 1200, display: "flex", justifyContent: "center" }}
      >
        <Card
          style={{ width: "70%", backgroundColor: containerColor }}
          title="My theme"
          extra={[
            <Space>
              <Button
                style={{ backgroundColor: colorPrimary, color: "white" }}
                htmlType="submit"
              >
                Apply
              </Button>
            </Space>,
          ]}
        >
          <AppearanceForm
            colorPrimary={colorPrimary}
            setColorPrimary={setColorPrimary}
            borderRadius={borderRadius}
            setBorderRadius={setBorderRadius}
            theme={theme}
            containerColor={containerColor}
            setContainerColor={setContainerColor}
          />
        </Card>
      </Form>
    </Flex>
  );
};

export default Appearance;
