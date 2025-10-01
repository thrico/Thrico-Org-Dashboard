import { useState } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Space,
  Typography,
  Divider,
  Modal,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { getActionsForModule } from "./utils";
import { mockBadges } from "./mockData";

const { Option } = Select;
const { Text } = Typography;

export default function BadgesTab() {
  const modules = [
    {
      name: "FEED",
      actions: ["LIKE_FEED", "POST_FEED", "COMMENT_FEED"],
    },
    {
      name: "LISTING",
      actions: ["LIKE_LISTING", "POST_LISTING", "SHARE_LISTING"],
    },
  ];
  const [badges, setBadges] = useState(mockBadges);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const addBadge = (values: any) => {
    const condition =
      values.type === "action"
        ? `${values.action} ${values.targetValue} times`
        : `Reach ${values.targetValue} points`;

    setBadges([
      ...badges,
      {
        ...values,
        id: Date.now(),
        condition,
      },
    ]);
    closeModal();
  };

  const deleteBadge = (id: number) => {
    setBadges(badges.filter((badge: any) => badge.id !== id));
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Button type="primary" icon={<PlusOutlined />} onClick={openModal}>
        New Badge
      </Button>

      {/* Modal for Add Badge */}
      <Modal
        title="Add New Badge"
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={addBadge}
          initialValues={{ type: "action", targetValue: 0 }}
        >
          <Form.Item
            name="name"
            label="Badge Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Feed Master" />
          </Form.Item>

          <Form.Item name="type" label="Type">
            <Select
              onChange={() =>
                form.setFieldsValue({ module: undefined, action: undefined })
              }
            >
              <Option value="action">Action-Based</Option>
              <Option value="points">Points-Based</Option>
            </Select>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prev, curr) => prev.type !== curr.type}
          >
            {({ getFieldValue }) => {
              const type = getFieldValue("type");
              if (type === "action") {
                return (
                  <>
                    <Form.Item
                      name="module"
                      label="Module"
                      rules={[{ required: true }]}
                    >
                      <Select placeholder="Select module">
                        <Option value="feed">Feed</Option>
                        <Option value="listing">Job Listing</Option>
                        <Option value="profile">Profile</Option>
                        <Option value="social">Social Interactions</Option>
                        <Option value="networking">Networking</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      noStyle
                      shouldUpdate={(prev, curr) => prev.module !== curr.module}
                    >
                      {({ getFieldValue }) => {
                        const module = getFieldValue("module");
                        const actions = getActionsForModule(module);
                        return (
                          <Form.Item
                            name="action"
                            label="Action"
                            rules={[{ required: true }]}
                          >
                            <Select>
                              {actions.map((a: any) => (
                                <Option key={a.value} value={a.value}>
                                  {a.label}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        );
                      }}
                    </Form.Item>
                  </>
                );
              }
              return null;
            }}
          </Form.Item>

          <Form.Item
            name="targetValue"
            label="Target Value"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item name="icon" label="Icon/Emoji">
            <Input placeholder="⭐" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={2} placeholder="Describe this badge" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button onClick={closeModal}>Cancel</Button>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Add Badge
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Current Badges */}
      <Card title="Current Badges">
        <Space direction="vertical" style={{ width: "100%" }}>
          {badges.map((badge: any) => (
            <div
              key={badge.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Space>
                  <span style={{ fontSize: 18 }}>{badge.icon}</span>
                  <Text strong>{badge.name}</Text>
                  <Text type="secondary">{badge.type}</Text>
                  {badge.module && (
                    <Text type="secondary">({badge.module})</Text>
                  )}
                </Space>
                <div style={{ marginLeft: 24 }}>
                  <Text type="secondary">Target: {badge.targetValue}</Text>
                  <br />
                  <Text type="secondary">{badge.description}</Text>
                </div>
              </div>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleteBadge(badge.id)}
              />
            </div>
          ))}
        </Space>
      </Card>
    </Space>
  );
}
