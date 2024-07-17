import { Button, Flex, Form, Input, Select } from "antd";
import React from "react";
import PhoneNumber from "../PhoneNumber";
import TimeZone from "../TimeZone";
import Language from "../Language";
import { getOrganization } from "../../../graphql/actions";
const { Option } = Select;
const Profile = ({ profile, setProfile, setCurrent }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setProfile(values);
    setCurrent(1);
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  return (
    <>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
        }}
        scrollToFirstError
      >
        <Form.Item label="Full Name" rules={[{ required: true }]} hasFeedback>
          <Input value={profile?.fullName} disabled style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Email" rules={[{ required: true }]} hasFeedback>
          <Input value={profile?.email} disabled style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          hasFeedback
          initialValue={profile?.designation}
          rules={[{ required: true }]}
          name="designation"
          label="Your Designation"
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <PhoneNumber initialValue={profile?.phone} />
        <TimeZone initialValue={profile?.timeZone} />
        <Language initialValue={profile?.language} />
        <Flex style={{ width: "100%" }} justify="center" align="center">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </>
  );
};

export default Profile;
