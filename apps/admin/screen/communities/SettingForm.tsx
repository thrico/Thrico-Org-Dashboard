import {
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Form,
  Space,
  Switch,
} from "antd";

const SettingForm = ({ loading, update, data }) => {
  interface formType {
    autoApprove: Boolean;
  }
  const onFinish = (values: formType) => {
    update({
      variables: {
        input: values,
      },
    });
  };
  const [form] = Form.useForm();
  console.log(data);
  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{
        ...data,
      }}
    >
      <Card
        extra={
          <Button loading={loading} type="primary" htmlType="submit">
            Update
          </Button>
        }
        title="Settings"
      >
        <Flex vertical gap={30}>
          <Form.Item
            name="autoApprove"
            label="Auto Approve"
            help="Auto Approve group"
          >
            <Switch checkedChildren={"Yes"} unCheckedChildren="No" />
          </Form.Item>

          <Form.Item label="Trending Condition">
            <Space split={<Divider type="vertical" style={{ height: 40 }} />}>
              <Form.Item name="views" help="Views">
                <Switch checkedChildren={"Yes"} unCheckedChildren="No" />
              </Form.Item>
              <Form.Item name="discussion" help="Discussion">
                <Switch checkedChildren={"Yes"} unCheckedChildren="No" />
              </Form.Item>
              <Form.Item name="user" help="User">
                <Switch checkedChildren={"Yes"} unCheckedChildren="No" />
              </Form.Item>
            </Space>
          </Form.Item>
        </Flex>
      </Card>
    </Form>
  );
};

export default SettingForm;
