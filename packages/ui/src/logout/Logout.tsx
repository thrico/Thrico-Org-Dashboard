import React, { useState } from "react";
import { Button, Flex, Modal, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const Logout = ({ open, handleOk, handleCancel }) => {
  const { Title, Paragraph, Text } = Typography;
  return (
    <>
      <Modal
        open={open}
        title=""
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Logout
          </Button>,
        ]}
      >
        <Flex
          justify="center"
          vertical
          style={{ width: "100%" }}
          align="center"
        >
          <LogoutOutlined style={{ fontSize: "7rem", padding: 50 }} />
          <Paragraph>Oh no! You're leaving... </Paragraph>{" "}
          <Paragraph> Are Your Sure?</Paragraph>
        </Flex>
      </Modal>
    </>
  );
};

export default Logout;
