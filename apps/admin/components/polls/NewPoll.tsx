"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  Layout,
  Popconfirm,
  Radio,
  Select,
  Space,
  Tabs,
  Typography,
} from "antd";
import { addPoll } from "../../graphql/actions/polls";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

export default function NewPoll() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [activeTab, setActiveTab] = useState("edit");

  const [form] = Form.useForm();
  const values = form.getFieldsValue();
  const onCompleted = () => {
    form.resetFields();
    setOpen(false);
  };
  const onFinish = (values: any) => {
    add({
      variables: {
        input: values,
      },
    });
  };

  const [add, { loading }] = addPoll({
    onCompleted,
  });

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        New Poll
      </Button>
      <Drawer
        title="Create New Poll"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        width={800}
        extra={
          <Space>
            <Button>
              <Link href="/polls">Cancel</Link>
            </Button>
            <Button
              onClick={() => form.submit()}
              type="primary"
              icon={<SaveOutlined />}
              loading={loading}
            >
              Save Poll
            </Button>
          </Space>
        }
      >
        <Layout style={{ minHeight: "100vh" }}>
          <Content style={{ padding: "24px", background: "#f5f5f5" }}>
            <Form
              initialValues={{
                options: [{}],
                resultVisibility: "AFTER_VOTE",
                title: "Untitled Poll",
                question: "What's your favorite option?",
              }}
              onFinish={onFinish}
              layout="vertical"
              form={form}
              style={{ maxWidth: 1200, margin: "0 auto" }}
            >
              <Tabs defaultActiveKey="edit" onChange={setActiveTab}>
                <TabPane tab="Edit" key="edit">
                  <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    <Card>
                      <Form.Item
                        name="title"
                        rules={[
                          {
                            required: true,
                            message: "Please enter a title",
                          },
                        ]}
                        label="Poll Title"
                      >
                        <Input style={{ fontSize: 18, fontWeight: "bold" }} />
                      </Form.Item>
                      <Form.Item
                        name="question"
                        rules={[
                          {
                            required: true,
                            message: "Please enter a Poll Question",
                          },
                        ]}
                        label="Poll Question"
                      >
                        <Input />
                      </Form.Item>
                    </Card>
                    <Card title="Poll Options">
                      <Form.List
                        name="options"
                        rules={[
                          {
                            validator: async (_, options) => {
                              if (!options || options.length < 2) {
                                return Promise.reject(
                                  new Error("At least 2 options")
                                );
                              }
                            },
                          },
                        ]}
                      >
                        {(fields, { add, remove, move }, { errors }) => (
                          <>
                            {fields.map(
                              ({ key, name, ...restField }, index) => (
                                <Space
                                  key={key}
                                  style={{
                                    display: "flex",
                                    marginBottom: 8,
                                    width: "100%",
                                    alignItems: "center",
                                  }}
                                  align="baseline"
                                >
                                  <Button
                                    icon={<ArrowUpOutlined />}
                                    onClick={() => move(index, index - 1)}
                                    disabled={index === 0}
                                    aria-label="Move option up"
                                  />
                                  <Form.Item
                                    style={{ paddingTop: 25 }}
                                    {...restField}
                                    name={[name, "option"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Option 1",
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder={`Option ${index + 1}`}
                                    />
                                  </Form.Item>

                                  <Popconfirm
                                    title="Delete this option?"
                                    onConfirm={() => remove(name)}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    <Button icon={<DeleteOutlined />} danger />
                                  </Popconfirm>

                                  <Button
                                    icon={
                                      <ArrowUpOutlined
                                        style={{ transform: "rotate(180deg)" }}
                                      />
                                    }
                                    onClick={() => move(index, index + 1)}
                                    disabled={index === fields.length - 1}
                                    aria-label="Move option down"
                                  />
                                </Space>
                              )
                            )}

                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Add Option
                              </Button>

                              <Form.ErrorList errors={errors} />
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Card>
                  </Space>
                </TabPane>

                <TabPane tab="Preview" key="preview">
                  <Card>
                    <Space
                      direction="vertical"
                      size="large"
                      style={{ width: "100%" }}
                    >
                      <div>
                        <Title level={3}> {values.title}</Title>
                        <Title level={4} style={{ fontWeight: "normal" }}>
                          {values.question}
                        </Title>
                      </div>

                      <Radio.Group style={{ width: "100%" }}>
                        <Space direction="vertical" style={{ width: "100%" }}>
                          {values?.options?.map(
                            (option: any, index: number) => (
                              <Radio key={index} value={option}>
                                {option?.option}
                              </Radio>
                            )
                          )}
                        </Space>
                      </Radio.Group>

                      <div style={{ textAlign: "right", marginTop: 24 }}>
                        <Button type="primary">Vote</Button>
                      </div>
                    </Space>
                  </Card>
                </TabPane>

                <TabPane tab="Settings" key="settings">
                  <Card>
                    <Space
                      direction="vertical"
                      size="large"
                      style={{ width: "100%" }}
                    >
                      <Form.Item
                        label="End Date (Optional)"
                        extra="Set an end date for your poll"
                        name="lastDate"
                      >
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>

                      <Form.Item
                        name="resultVisibility"
                        label="Results Visibility"
                      >
                        <Select
                          style={{ width: "100%" }}
                          options={[
                            { value: "ALWAYS", label: "Always visible" },
                            { value: "AFTER_VOTE", label: "After voting" },
                            { value: "AFTER_END", label: "After end date" },
                            { value: "ADMIN", label: "Admin only" },
                          ]}
                        />
                      </Form.Item>
                    </Space>
                  </Card>
                </TabPane>
              </Tabs>
            </Form>
          </Content>
        </Layout>
      </Drawer>
    </>
  );
}
