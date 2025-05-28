import { Button, Card, Divider, Flex, Form, Switch } from "antd";
import { useEffect, useRef, useState } from "react";

type formType = {
  loading: boolean;
  update: (args: any) => void;
  data: Record<string, any>;
};

const Settings = ({ loading, update, data }: formType) => {
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
            name="allowDiscussionForum"
            label="Auto Approve Discussions Forum"
            tooltip="Auto Discussion Forum"
            valuePropName="checked"
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>

          <Form.Item
            name="autoApproveDiscussionForum"
            label="Allow Discussion Forum"
            tooltip="Turn off temporarily if you need to pause Discussion Forum"
            valuePropName="checked"
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
        </Flex>
      </Card>
    </Form>
  );
};

export default Settings;
