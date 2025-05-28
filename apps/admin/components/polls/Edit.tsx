"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpOutlined,
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined,
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
import { editPolls } from "../../graphql/actions/polls";
import { poll } from "./ts-types";
import { on } from "events";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

export default function Edit({
  poll,
  open,
  onClose,
}: {
  poll: poll | null;
  open: boolean;
  onClose: () => void;
}) {
  const [pollTitle, setPollTitle] = useState("Untitled Poll");
  const [pollQuestion, setPollQuestion] = useState(
    "What's your favorite option?"
  );

  const [resultVisibility, setResultVisibility] = useState(
    poll?.resultVisibility
  );

  const [activeTab, setActiveTab] = useState("edit");

  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    edit({
      variables: {
        input: { ...values, id: poll?.id, resultVisibility },
      },
    });
  };
  const onCompleted = () => {
    form.resetFields();
    onClose();
  };

  const [edit, { loading }] = editPolls({
    onCompleted,
  });
  const values = form.getFieldsValue();

  return (
    <>
      <Drawer
        title="Edi Poll"
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
                resultVisibility: poll?.resultVisibility,
                title: poll?.title || "Untitled Poll",
                lastDate: poll?.endDate,
                options: poll?.options
                  ?.slice()
                  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                  .map((set) => ({
                    option: set.text,
                    id: set.id,
                  })),
                question: poll?.question || "What's your favorite option?",
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
                        <Input
                          value={pollTitle}
                          onChange={(e) => setPollTitle(e.target.value)}
                          style={{ fontSize: 18, fontWeight: "bold" }}
                        />
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
                        <Input
                          value={pollQuestion}
                          onChange={(e) => setPollQuestion(e.target.value)}
                        />
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
                                    style={{ paddingTop: 25, display: "none" }}
                                    {...restField}
                                    name={[name, "id"]}
                                  >
                                    <Input />
                                  </Form.Item>
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
                        name="endDate"
                      >
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>

                      <Form.Item label="Results Visibility">
                        <Select
                          style={{ width: "100%" }}
                          value={resultVisibility}
                          onChange={(value) => {
                            setResultVisibility(value);
                          }}
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
