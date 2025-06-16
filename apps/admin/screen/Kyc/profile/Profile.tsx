import { Button, Flex, Form, Input, Select } from "antd";
import React from "react";
import PhoneNumber from "../PhoneNumber";
import TimeZone from "../TimeZone";
import Language from "../Language";
import { getEntity } from "../../../graphql/actions";
import { country } from "../types";
const { Option } = Select;
interface ProfileProps {
  fullName: string;
  email: string;
  profile: {
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
  countries: country[];
}

const Profile: React.FC<ProfileProps> = ({
  profile,
  setProfile,
  setCurrent,
  data,
  countries,
}) => {
  const fullName = data?.firstName + " " + data?.lastName;
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setProfile(values);
    setCurrent(1);
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
        <Form.Item
          initialValue={profile?.country}
          hasFeedback
          name="country"
          label="Country"
          style={{ width: "100%" }}
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Select>
            {countries?.map((set, key) => (
              <Option key={set.code} value={set.code}>
                {set.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
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
