import { Form, Input, Select, Button, Checkbox, Switch } from "antd";
import { useMemo } from "react";

const { Option } = Select;

export function EditRuleForm({
  initialValues,
  onSubmit,
  onCancel,
  loading,
}: any) {
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
      <Form.Item
        style={{ display: "none" }}
        name="id"
        label="Points"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="points" label="Points" rules={[{ required: true }]}>
        <Input max={100000} min={1} type="number" placeholder="Enter points" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea rows={2} placeholder="Describe the rule" />
      </Form.Item>

      <Form.Item name="isActive" label="isActive">
        <Switch />
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
