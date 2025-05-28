import { Button, Card, Divider, Flex, Form, Switch } from "antd";
import { useEffect, useRef, useState } from "react";
import { formType } from "../ts-types";

const SettingForm = ({ loading, update, data }: formType) => {
  const [form] = Form.useForm();
  const [isChanged, setIsChanged] = useState(false);

  // Store initial values for comparison
  const initialValuesRef = useRef(data);

  const onFinish = (values: any) => {
    update({
      variables: {
        input: values,
      },
    });
    setIsChanged(false);
    initialValuesRef.current = values; // update baseline
  };

  // Detect if form values differ from initial ones
  const handleValuesChange = () => {
    const current = form.getFieldsValue();
    const initial = initialValuesRef.current;

    const changed = Object.keys(current).some(
      (key) => current[key] !== initial[key]
    );

    setIsChanged(changed);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onValuesChange={handleValuesChange}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={data}
    >
      <Card
        extra={
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            disabled={!isChanged}
          >
            Save
          </Button>
        }
        title="Settings"
      >
        <Flex vertical>
          <Form.Item
            name="autoApproveUser"
            label="Auto Approve New User"
            tooltip="Auto Approve Users"
            valuePropName="checked"
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>

          <Form.Item
            name="allowNewUser"
            label="Allow New User"
            tooltip="Turn off temporarily if you need to pause new User"
            valuePropName="checked"
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
        </Flex>
      </Card>
    </Form>
  );
};

export default SettingForm;
