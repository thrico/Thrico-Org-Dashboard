import React from "react";
import KycForm from "../Kyc/Form";
import { Card, Flex } from "antd";

const Dashboard = () => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ width: "100%", display: "flex" }}
    >
      <Card
        extra={
          <>
            <a target="_blank" href="https://thrico.com/privacy-policy/">
              Agreement
            </a>
          </>
        }
        style={{ width: "60%" }}
        title="Kyc Form"
      >
        <Flex style={{ width: "100%" }}>
          <KycForm />
        </Flex>
      </Card>
    </Flex>
  );
};

export default Dashboard;
