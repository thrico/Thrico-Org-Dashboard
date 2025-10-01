"use client";

import { Button, Form, Card, Select, Radio, Input, Typography } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { useCustomFormStore } from "../../../../store/customFormStore";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface BudgetTimelineProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function BudgetTimeline({
  onNext,
  onPrevious,
}: BudgetTimelineProps) {
  const { timeLine, setTimeLine } = useCustomFormStore();
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    setTimeLine({
      budget: values.budget,
      timeline: values.timeline,
      decisionMakers: values.decisionMakers,
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
        <Title level={2} style={{ margin: 0 }}>
          Budget & Timeline
        </Title>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        initialValues={{
          budget: timeLine?.budget,
          timeline: timeLine?.timeline,
          decisionMakers: timeLine?.decisionMakers,
        }}
      >
        <Form.Item
          label="Annual Budget Range"
          name="budget"
          rules={[
            { required: true, message: "Please select your budget range" },
          ]}
        >
          <Select placeholder="Select your budget range">
            <Option value="under25k">Under $25,000</Option>
            <Option value="25k-50k">$25,000 - $50,000</Option>
            <Option value="50k-100k">$50,000 - $100,000</Option>
            <Option value="100k-250k">$100,000 - $250,000</Option>
            <Option value="over250k">Over $250,000</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Implementation Timeline"
          name="timeline"
          rules={[
            {
              required: true,
              message: "Please select implementation timeline",
            },
          ]}
        >
          <Radio.Group>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Radio value="immediate">Immediate (within 30 days)</Radio>
              <Radio value="1-3">1-3 months</Radio>
              <Radio value="3-6">3-6 months</Radio>
              <Radio value="6plus">6+ months</Radio>
              <Radio value="exploring">Just exploring options</Radio>
            </div>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Who else is involved in the decision-making process?"
          name="decisionMakers"
        >
          <TextArea
            placeholder="e.g., CTO, IT Director, Procurement team..."
            rows={4}
          />
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
