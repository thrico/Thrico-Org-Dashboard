"use client";

import { useState } from "react";
import {
  Layout,
  Typography,
  Button,
  Steps,
  Table,
  Card,
  Row,
  Col,
  Space,
  Divider,
  Spin,
  Tag,
  Popconfirm,
  PopconfirmProps,
} from "antd";
import {
  ArrowLeftOutlined,
  ShopOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import {
  checkUpdatedDnsRecord,
  deleteDomain,
  getCustomDomainDetails,
} from "../../../../graphql/actions/domain";
import CheckSsl from "./CheckSsl";
import { notFound, useRouter } from "next/navigation";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function DomainManagement({ id }: { id: string }) {
  const router = useRouter();
  const [del, { loading: loadBtn }] = deleteDomain({
    onCompleted: (data) => {
      router.push(`/settings/domains`);
    },
  });
  const { data, loading, error } = getCustomDomainDetails({
    variables: {
      input: {
        id,
      },
    },
  });
  if (error) {
    notFound();
  }

  const [check, { loading: btnLoading }] = checkUpdatedDnsRecord({});

  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    del({
      variables: {
        input: {
          id,
        },
      },
    });
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 20px",
          height: "64px",
          lineHeight: "64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            style={{ marginRight: "10px" }}
          />
          <Title level={4} style={{ margin: 0 }}>
            {data?.getCustomDomainDetails?.domain}
          </Title>
          {!data?.getCustomDomainDetails?.isVerified && (
            <Tag style={{ marginLeft: "10px" }}>Needs Setup</Tag>
          )}

          {data?.getCustomDomainDetails?.isVerified ? (
            <>
              <Tag
                icon={<CheckCircleOutlined />}
                color="success"
                style={{ marginLeft: "10px" }}
              >
                Verified
              </Tag>
            </>
          ) : (
            <Tag
              icon={<CloseCircleOutlined />}
              color="error"
              style={{ marginLeft: "10px" }}
            >
              Not Verified
            </Tag>
          )}

          {data?.getCustomDomainDetails?.isVerified && (
            <>
              {!data?.getCustomDomainDetails?.ssl && (
                <CheckSsl id={id} ssl={data?.getCustomDomainDetails?.ssl} />
              )}
            </>
          )}

          <div style={{ marginLeft: "auto" }}>
            <Button>View</Button>
          </div>
        </div>
      </Header>
      <Content style={{ padding: "20px", width: "100%" }}>
        <Card style={{ marginBottom: "20px", width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "#f0f0f0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "#a4d65e",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ShopOutlined style={{ fontSize: "40px", color: "white" }} />
              </div>
            </div>
          </div>
          <>
            <ol style={{ paddingLeft: "20px" }}>
              <li style={{ marginBottom: "15px" }}>
                Log in to your provider and open DNS management for
                <strong> {data?.getCustomDomainDetails?.domain}</strong>
              </li>
              <li style={{ marginBottom: "15px" }}>
                Add these new DNS records
              </li>
            </ol>

            <Table
              pagination={false}
              style={{ marginBottom: "20px" }}
              columns={[
                { title: "Type", dataIndex: "type", key: "type" },
                { title: "Name", dataIndex: "name", key: "name" },
                {
                  title: "Value",
                  dataIndex: "value",
                  key: "currentValue",
                },
                {
                  title: "Status",
                  dataIndex: "verified",
                  key: "status",
                  render: (status) => (
                    <a>
                      {status ? (
                        <CheckCircleOutlined style={{ color: "green" }} />
                      ) : (
                        <CloseCircleOutlined style={{ color: "red" }} />
                      )}
                    </a>
                  ),
                },
              ]}
              dataSource={
                !data?.getCustomDomainDetails?.isSubDomain
                  ? [
                      {
                        key: "1",
                        type: "CNAME",
                        ...data?.getCustomDomainDetails?.cname,
                      },
                      {
                        key: "1",
                        type: "TXT",
                        ...data?.getCustomDomainDetails?.txt,
                      },
                      {
                        key: "1",
                        type: "A",
                        ...data?.getCustomDomainDetails?.aRecord,
                      },
                    ]
                  : [
                      {
                        key: "1",
                        type: "CNAME",
                        ...data?.getCustomDomainDetails?.cname,
                      },
                      {
                        key: "1",
                        type: "TXT",
                        ...data?.getCustomDomainDetails?.txt,
                      },
                    ]
              }
            />

            {/* {!data?.getCustomDomainDetails?.isVerified && ( */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Button
                loading={btnLoading}
                onClick={() =>
                  check({
                    variables: {
                      input: {
                        id,
                      },
                    },
                  })
                }
              >
                I updated Dns Records
              </Button>
            </div>
            {/* )} */}
          </>
        </Card>

        <Popconfirm
          title="Delete Domain"
          description="Are you sure to delete this delete?"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ loading: loadBtn }}
        >
          <Button loading={loadBtn} danger>
            Delete domain
          </Button>
        </Popconfirm>
      </Content>
    </Layout>
  );
}
