export const cardStyle = (isPopular: boolean): React.CSSProperties => ({
  height: "100%",
  position: "relative",
  transform: isPopular ? "scale(1.05)" : "none",
  zIndex: isPopular ? 1 : 0,
  backgroundColor: undefined,
  borderColor: isPopular ? "#1890ff" : undefined,
});

export const sectionTitleStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 500,
  color: "#64748b",
  marginBottom: "16px",
  textTransform: "uppercase",
};

export const planCardStyle: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
  padding: "24px",
  marginBottom: "24px",
};

export const billingOptionStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  marginBottom: "12px",
};

export const priceStyle: React.CSSProperties = {
  textAlign: "right",
};

export const priceAmountStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 600,
  color: "#1e293b",
};

export const priceDetailStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#64748b",
};

export const savingsStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#22c55e",
};

export const summaryRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "16px",
};

export const summaryLabelStyle: React.CSSProperties = {
  fontSize: "15px",
  color: "#64748b",
};

export const summaryValueStyle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 500,
  color: "#1e293b",
};

export const totalRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  borderTop: "1px solid #e2e8f0",
  paddingTop: "16px",
  marginTop: "16px",
  marginBottom: "16px",
};

export const totalLabelStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: 600,
  color: "#1e293b",
};

export const totalValueStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
  color: "#1e293b",
};

export const nextBillingStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#64748b",
  marginTop: "16px",
};

export const effectiveImmediatelyStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  fontSize: "15px",
  color: "#64748b",
};

export const calendarIconStyle: React.CSSProperties = {
  marginRight: "8px",
};

export const creditStyle: React.CSSProperties = {
  color: "#22c55e",
  fontWeight: 500,
};

export interface RazorpayData {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
  created_at: number;
}
