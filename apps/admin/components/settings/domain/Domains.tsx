import { Content } from "antd/es/layout/layout";
import React from "react";
import {
  Layout,
  Menu,
  Avatar,
  Typography,
  Card,
  Button,
  Input,
  List,
  Space,
  Row,
  Col,
  Tag,
} from "antd";
import { CheckCircleOutlined, GlobalOutlined } from "@ant-design/icons";
import { getEntity } from "../../../graphql/actions";
import DomainChange from "./thrico/DomainChange";
import Custom from "./custom/Custom";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { AddDomain } from "./custom/AddDomain";
import ThricoDomain from "./thrico/ThricoDomain";
import { getCustomDomain } from "../../../graphql/actions/domain";
const { Title, Text, Link } = Typography;
const Domains = () => {
  const { data, loading } = getEntity();

  const {
    getEntity: { entity },
  } = data || {};

  const { data: domain } = getCustomDomain();
  return (
    <Card title={"Domains"}>
      {!domain?.getCustomDomain?.id && (
        <Card style={{ marginBottom: "24px" }}>
          <Title level={4}>Buy or connect a domain</Title>
          <Text>
            Secure the perfect web address for your portal that customers can
            trust and find easily. Get a new one, or connect one you already
            bought from a third-party provider like Namecheap or GoDaddy.
          </Text>

          <Row style={{ marginTop: "24px" }}>
            <Space>
              <AddDomain />

              <Button target="_blank" href="https://www.namecheap.com/domains/">
                Buy new domain
              </Button>
            </Space>
            <Col
              flex="auto"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  border: "1px solid #f0f0f0",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <GlobalOutlined
                  style={{ fontSize: "24px", color: "#52c41a" }}
                />
                <Text>www</Text>
              </div>
            </Col>
          </Row>
        </Card>
      )}

      <List style={{ gap: 20 }} itemLayout="horizontal">
        <ThricoDomain />

        <Custom />
      </List>
    </Card>
  );
};

export default Domains;
