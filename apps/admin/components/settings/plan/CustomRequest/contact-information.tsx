"use client";

import { Button, Input, Form, Card, Select, Row, Col, Typography } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { useCustomFormStore } from "../../../../store/customFormStore";
import { createCustomRequest } from "../../../../graphql/actions/plan";

const { Title } = Typography;
const { Option } = Select;

interface ContactInformationProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function ContactInformation({
  onNext,
  onPrevious,
}: ContactInformationProps) {
  const [form] = Form.useForm();
  const { contact, setContact } = useCustomFormStore();

  const { teamRequirements, features, timeLine, security } =
    useCustomFormStore();
  const [create, { loading: creating }] = createCustomRequest({
    onCompleted() {
      onNext();
    },
  });

  const handleSubmit = async (values: any) => {
    await setContact({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      jobTitle: values.jobTitle,
      contactMethod: values.contactMethod,
    });
    await create({
      variables: {
        input: {
          teamRequirements,
          features,
          timeLine,
          security,
          contact,
        },
      },
    });
  };

  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 24,
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Contact Information
        </Title>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        initialValues={{
          firstName: contact.firstName || "",
          lastName: contact.lastName || "",
          email: contact.email || "",
          phone: contact.phone || "",
          jobTitle: contact.jobTitle || "",
          contactMethod: contact.contactMethod || "email",
        }}
      >
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input placeholder="John" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input placeholder="Doe" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Business Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="john.doe@acme.com" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Phone Number" name="phone">
              <Input placeholder="+1 (555) 123-4567" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Job Title"
              name="jobTitle"
              rules={[
                { required: true, message: "Please enter your job title" },
              ]}
            >
              <Input placeholder="CTO, IT Director, etc." />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Preferred Contact Method" name="contactMethod">
              <Select placeholder="Select preferred method">
                <Option value="email">Email</Option>
                <Option value="phone">Phone</Option>
                <Option value="video">Video Call</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 30,
            gap: 16,
          }}
        >
          <Button onClick={onPrevious}>Previous</Button>
          <Button loading={creating} type="primary" htmlType="submit">
            Next
          </Button>
        </div>
      </Form>
    </Card>
  );
}
