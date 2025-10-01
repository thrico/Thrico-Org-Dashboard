import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 48, color: "#1890ff" }} spin />
);

export default function PaymentLoading() {
  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(4px)",
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "32px",
    textAlign: "center",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: 600,
    color: "#262626",
    marginBottom: "8px",
    marginTop: "24px",
  };

  const messageStyle: React.CSSProperties = {
    fontSize: "18px",
    color: "#595959",
    margin: 0,
  };

  return (
    <div style={overlayStyle}>
      <div style={containerStyle}>
        <Spin indicator={antIcon} size="large" />
        <div>
          <h2 style={titleStyle}>Verify Your Payment</h2>
          <p style={messageStyle}>Please wait...</p>
        </div>
      </div>
    </div>
  );
}
