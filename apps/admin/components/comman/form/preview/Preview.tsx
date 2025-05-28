import React, { useState } from "react";
import { Button, Card, Divider, Space, Tabs, Typography } from "antd";

import { TabsProps } from "antd/lib";
import { ScrollView } from "./ScrollView";
import { FormSettings, Question } from "../../../../store/ts-types";
import { MultiStepPreview } from "./MultiStepPreview";
const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;
interface PreviewProps {
  formTitle: string;
  formDescription?: string;
  questions: Question[];
  formSettings: FormSettings; // Replace 'any' with the correct type if known
}

const Preview: React.FC<PreviewProps> = ({
  formTitle,
  formDescription,
  questions,
  formSettings,
}) => {
  const onChange = (key: string) => {
    key === "2" && setShowTypeFormPreview(true);
    setActive(key);
  };

  const [active, setActive] = useState("1");
  const [showTypeFormPreview, setShowTypeFormPreview] = useState(false);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "ScrollView",
      children: (
        <Card>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div>
              <Title level={3}>{formTitle}</Title>
              {formDescription && <Paragraph>{formDescription}</Paragraph>}
            </div>

            {questions.map((question, index) => (
              <div key={question.id}>
                {index > 0 && <Divider />}
                {ScrollView(question)}
              </div>
            ))}

            <div style={{ textAlign: "right", marginTop: 24 }}>
              <Button type="primary">Submit</Button>
            </div>
          </Space>
        </Card>
      ),
    },
    {
      key: "2",
      label: "Multi Set View",
      children: (
        <>
          {showTypeFormPreview && (
            <MultiStepPreview
              formSettings={formSettings}
              formTitle={formTitle}
              formDescription={formDescription}
              questions={questions}
              onClose={() => {
                setShowTypeFormPreview(false);
                setActive("1");
              }}
            />
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Tabs activeKey={active} items={items} onChange={onChange} />;
    </>
  );
};

export default Preview;
