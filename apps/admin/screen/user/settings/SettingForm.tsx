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
            Save
          </Button>
        }
        title="Settings"
      >
        <Divider orientation="left">Listing Approval</Divider>
        <Flex vertical>
          <Form.Item
            name="autoApprove"
            label="Auto Approve New User"
            tooltip="Auto Approve Users"
          >
            <Switch checkedChildren={"Yes"} unCheckedChildren="No" />
          </Form.Item>

          <Form.Item
            name="allowNewUser"
            label="Allow New User"
            valuePropName="checked"
            tooltip="Turn off temporarily if you need to pause new User"
          >
            <Switch />
          </Form.Item>
        </Flex>
      </Card>
    </Form>
  );
};

export default SettingForm;
