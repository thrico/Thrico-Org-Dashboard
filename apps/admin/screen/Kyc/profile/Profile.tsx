import { Button, Flex, Form, Input, Select } from "antd";
import React from "react";
import PhoneNumber from "../PhoneNumber";
import TimeZone from "../TimeZone";
import Language from "../Language";
import { getEntity } from "../../../graphql/actions";
const { Option } = Select;
interface ProfileProps {
  profile: {
    fullName: string;
    email: string;
    designation?: string;
    phone?: string;
    country?: string;
    language?: string;
  };
  setProfile: (values: any) => void;
  setCurrent: (step: number) => void;
  data?: {
    email?: string;
    firstName?: string;
    lastName?: string;
  };
}

const Profile: React.FC<ProfileProps> = ({
  profile,
  setProfile,
  setCurrent,
  data,
}) => {
  const fullName = data?.firstName + " " + data?.lastName;
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
        size="middle"
      >
        <Form.Item label="Full Name" rules={[{ required: true }]} hasFeedback>
          <Input value={fullName} disabled style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Email" rules={[{ required: true }]} hasFeedback>
          <Input value={data?.email} disabled style={{ width: "100%" }} />
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

        <PhoneNumber initialValue={profile?.phone || ""} />
        <TimeZone initialValue={profile?.country} />
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
