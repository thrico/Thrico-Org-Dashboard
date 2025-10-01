import { Form, Input, Select, Button } from "antd";
import { useMemo } from "react";

const { Option } = Select;

export function PointRuleForm({
  initialValues,
  onSubmit,
  onCancel,
  loading,
}: any) {
  const modules = [
    {
      name: "FEED",
      actions: ["POST_FEED", "COMMENT_FEED", "SHARE_FEED"],
    },
    {
      name: "LISTING",
      actions: ["POST_LISTING", "SHARE_LISTING"],
    },
  ];

  const [form] = Form.useForm();

  // ✅ Watch selected module
  const selectedModule = Form.useWatch("module", form);

  // ✅ Get actions for that module

  function getActionsForModule(moduleKey: string, modules: any[]) {
    const found = modules.find(
      (mod) => mod.name.toLowerCase() === moduleKey?.toLowerCase()
    );

    return (
      found?.actions.map((action: string) => ({
        value: action,
        label: action
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (c) => c.toUpperCase()),
      })) || []
    );
  }
  const moduleActions = useMemo(() => {
    return getActionsForModule(selectedModule, modules);
  }, [selectedModule]);

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Form.Item name="module" label="Module" rules={[{ required: true }]}>
        <Select placeholder="Select module">
          {modules.map((mod) => (
            <Option key={mod.name} value={mod.name}>
              {mod.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="action" label="Action" rules={[{ required: true }]}>
        <Select placeholder="Select action" disabled={!selectedModule}>
          {moduleActions.map((action: any) => (
            <Option key={action.value} value={action.value}>
              {action.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="trigger"
        label="Trigger Type"
        rules={[{ required: true }]}
      >
        <Select placeholder="Select trigger type">
          <Option value="FIRST_TIME">First Time</Option>
          <Option value="RECURRING">Recurring</Option>
        </Select>
      </Form.Item>

      <Form.Item name="points" label="Points" rules={[{ required: true }]}>
        <Input type="number" placeholder="Enter points" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea rows={2} placeholder="Describe the rule" />
      </Form.Item>

      <Form.Item>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          style={{ marginRight: 8 }}
        >
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Form.Item>
    </Form>
  );
}
