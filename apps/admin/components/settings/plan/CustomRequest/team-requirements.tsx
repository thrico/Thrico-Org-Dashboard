"use client";

import {
  Button,
  Input,
  Form,
  Card,
  Select,
  Checkbox,
  Row,
  Col,
  Typography,
} from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { useCustomFormStore } from "../../../../store/customFormStore";

const { Title } = Typography;
const { Option } = Select;

interface TeamRequirementsProps {
  onNext: () => void;
}

export default function TeamRequirements({ onNext }: TeamRequirementsProps) {
  const { teamRequirements, setTeamRequirements } = useCustomFormStore();
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    setTeamRequirements({
      teamSize: values.teamSize,
      currentSolution: values.currentSolution,
      painPoints: values.painPoints,
    });
    console.log("Team Requirements:", values);
    onNext();
  };

  const painPointOptions = [
    { label: "Current solution is too expensive", value: "expensive" },
    { label: "Limited scalability", value: "scalability" },
    { label: "Poor user experience", value: "ux" },
    { label: "Lack of mobile access", value: "mobile" },
    { label: "Insufficient analytics/reporting", value: "analytics" },
    { label: "Security concerns", value: "security" },
    { label: "Integration challenges", value: "integration" },
    { label: "Poor customer support", value: "support" },
    { label: "Missing key features", value: "features" },
    { label: "Compliance issues", value: "compliance" },
  ];

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
        <TeamOutlined style={{ color: "#1890ff", fontSize: 20 }} />
        <Title level={2} style={{ margin: 0 }}>
          Team & Requirements
        </Title>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        initialValues={{
          teamSize: teamRequirements?.teamSize,
          currentSolution: teamRequirements?.currentSolution,
          painPoints: teamRequirements?.painPoints || [],
        }}
      >
        <Form.Item
          label="Expected Team Size"
          name="teamSize"
          rules={[
            { required: true, message: "Please select expected team size" },
          ]}
        >
          <Select placeholder="Select expected team size">
            <Option value="1-10">1-10 employees</Option>
            <Option value="11-50">11-50 employees</Option>
            <Option value="51-200">51-200 employees</Option>
            <Option value="201-500">201-500 employees</Option>
            <Option value="501-1000">501-1000 employees</Option>
            <Option value="1000plus">1000+ employees</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Current Solution" name="currentSolution">
          <Input placeholder="What solution are you currently using?" />
        </Form.Item>

        <Form.Item
          label="What are your main pain points? (Select all that apply)"
          name="painPoints"
        >
          <Checkbox.Group>
            <Row gutter={[16, 16]}>
              {painPointOptions.map((option) => (
                <Col xs={24} md={12} key={option.value}>
                  <Checkbox value={option.value}>{option.label}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 30 }}
        >
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div>
      </Form>
    </Card>
  );
}
