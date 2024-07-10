import React from "react";
import {
  Button,
  Card,
  Form,
  Input,
  List,
  message,
  Space,
  Typography,
} from "antd";
import {
  CheckCircleFilled,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import isValidDomain from "is-valid-domain";
import {
  checkDomainIsVerified,
  getCustomDomain,
  updateDomain,
} from "../../graphql/actions/user";
import { deleteDomain } from "../../graphql/actions";
const AddDomain = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    if (!isValidDomain(values.domain)) {
      message.error("Please enter valid domain");
    }
    add({
      variables: {
        input: values,
      },
    });
    console.log(values);
  };

  const { data, loading: loadDomain } = getCustomDomain();

  const [add, { loading }] = updateDomain();
  const [delDomain, { loading: deleteDomainLoading }] = deleteDomain();
  const { loading: checkIdVerified, refetch } = checkDomainIsVerified({
    pollInterval: 5000,
  });
  console.log(checkIdVerified);
  return (
    <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
      <Card loading={loadDomain}>
        <>
          {data?.getCustomDomain?.domain && (
            <>
              <Typography.Title>Domain</Typography.Title>
              <List>
                <List.Item
                  actions={[
                    <Space>
                      {data?.getCustomDomain.status && (
                        <Button
                          icon={
                            <CheckCircleFilled
                              style={{
                                color: "green",
                              }}
                            />
                          }
                          loading={checkIdVerified}
                        >
                          Verfiled
                        </Button>
                      )}
                      {!data?.getCustomDomain.status && (
                        <Button
                          onClick={() => refetch()}
                          loading={checkIdVerified}
                        >
                          Checking
                        </Button>
                      )}

                      <Button
                        onClick={() => delDomain()}
                        icon={<DeleteOutlined />}
                        loading={deleteDomainLoading}
                        type="text"
                      >
                        Delete
                      </Button>
                    </Space>,
                  ]}
                >
                  <List.Item.Meta
                    title={data?.getCustomDomain?.domain}
                    description="You are using custom domain"
                  />
                </List.Item>
              </List>

              <Space style={{ gap: 20 }}>
                <Space>
                  <Typography
                    style={{
                      color: data?.getCustomDomain?.dnsConfig
                        ? "green"
                        : "#d3d5d9",
                    }}
                  >
                    Dns Config
                  </Typography>
                  <CheckCircleFilled
                    style={{
                      color: data?.getCustomDomain?.dnsConfig
                        ? "green"
                        : "#d3d5d9",
                    }}
                  />
                </Space>
                <Space>
                  <Typography
                    style={{
                      color: data?.getCustomDomain?.ssl ? "green" : "#d3d5d9",
                    }}
                  >
                    SSL
                  </Typography>
                  <CheckCircleFilled
                    style={{
                      color: data?.getCustomDomain?.ssl ? "green" : "#d3d5d9",
                    }}
                  />
                </Space>
                <Space>
                  <Typography
                    style={{
                      color: data?.getCustomDomain?.status
                        ? "green"
                        : "#d3d5d9",
                    }}
                  >
                    Status
                  </Typography>
                  <CheckCircleFilled
                    style={{
                      color: data?.getCustomDomain?.status
                        ? "green"
                        : "#d3d5d9",
                    }}
                  />
                </Space>
              </Space>
            </>
          )}

          {!data?.getCustomDomain?.domain && (
            <>
              <List>
                <List.Item>
                  <List.Item.Meta
                    title={"Enter your domain name"}
                    description={
                      <>
                        Do not enter https:// . If you want to map a custom
                        subdomain, enter full sub-domain URL <br />
                        <a
                          target="_blank"
                          href="https://support.thrico.network/en/articles/5755362-how-to-map-a-custom-domain"
                        >
                          <ExclamationCircleOutlined /> Read Instructions
                        </a>
                      </>
                    }
                  />
                </List.Item>
              </List>
              <Form.Item
                name="domain"
                label="Domain"
                rules={[{ required: true }]}
              >
                <Input placeholder="mydomain.com" />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button loading={loading} type="primary" htmlType="submit">
                    Update
                  </Button>
                </Space>
              </Form.Item>
            </>
          )}
        </>
      </Card>
    </Form>
  );
};

export default AddDomain;
