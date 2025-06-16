"use client";

import {
  Button,
  Form,
  Card,
  Checkbox,
  Input,
  Select,
  Row,
  Col,
  Typography,
} from "antd";
import { useCustomFormStore } from "../../../../store/customFormStore";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface SecurityRequirementsProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function SecurityRequirements({
  onNext,
  onPrevious,
}: SecurityRequirementsProps) {
  const { security, setSecurity } = useCustomFormStore();
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Security Requirements:", values);
    setSecurity({
      technicalRequirements: values.technicalRequirements,
      additionalInfo: values.additionalInfo,
      referral: values.referral,
    });
    onNext();
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
        {/* <ShieldCheckOutlined style={{ color: "#1890ff", fontSize: 20 }} /> */}
        <Title level={2} style={{ margin: 0 }}>
          Security & Additional Requirements
        </Title>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        initialValues={{
          technicalRequirements: security.technicalRequirements || "",
          additionalInfo: security.additionalInfo || "",
          referral: security.referral || "",
        }}
      >
        <Form.Item
          label="Specific Technical Requirements"
          name="technicalRequirements"
          style={{ marginTop: 32 }}
        >
          <TextArea
            placeholder="Any specific technical requirements, infrastructure needs, or constraints..."
            rows={4}
          />
        </Form.Item>

        <Form.Item label="Additional Information" name="additionalInfo">
          <TextArea
            placeholder="Anything else you'd like us to know about your requirements..."
            rows={4}
          />
        </Form.Item>

        <Form.Item label="How did you hear about Thrico?" name="referral">
          <Select placeholder="Select an option">
            <Option value="search">Search Engine</Option>
            <Option value="social">Social Media</Option>
            <Option value="referral">Referral</Option>
            <Option value="event">Event or Conference</Option>
            <Option value="ad">Online Advertisement</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 30,
            gap: 16,
          }}
        >
          <Button onClick={onPrevious}>Previous</Button>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div>
      </Form>
    </Card>
  );
}
