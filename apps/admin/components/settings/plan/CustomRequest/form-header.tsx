import { Card, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function FormHeader() {
  return (
    <Card
      style={{
        marginBottom: 32,
        backgroundColor: "#f6f4ff",
        border: "1px solid #e6e0ff",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <StarFilled
          style={{ color: "#722ed1", fontSize: 24, marginRight: 8 }}
        />
        <Title level={2} style={{ margin: 0 }}>
          Custom Enterprise Plan Request
        </Title>
      </div>
      <Paragraph style={{ color: "#666", margin: 0 }}>
        Tell us about your needs and we'll create a tailored solution for your
        organization
      </Paragraph>
    </Card>
  );
}
