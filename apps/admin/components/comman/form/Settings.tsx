import {
  Button,
  Card,
  ColorPicker,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Slider,
  Space,
  Typography,
} from "antd";
import React from "react";
import { FormSettings, UpdateFormSettingFn } from "../../../store/ts-types";

type SettingsProps = {
  formSettings: FormSettings;
  updateFormSetting: UpdateFormSettingFn;
};

const Settings = ({ formSettings, updateFormSetting }: SettingsProps) => {
  const { Title, Text } = Typography;
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="Form Configuration">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Form.Item label="Form View Type">
            <Select
              defaultValue="MULTI_STEP"
              style={{ width: "100%" }}
              options={[
                {
                  value: "MULTI_STEP",
                  label: "MULTI_STEP (one question per page)",
                },
                {
                  value: "SCROLL_LONG",
                  label: "Scroll Long (all questions on one page)",
                },
              ]}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                Choose how respondents will view your form
              </Text>
            </div>
          </Form.Item>

          <Form.Item label="End Date (Optional)">
            <DatePicker />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">Set an end date for your form</Text>
            </div>
          </Form.Item>
        </Space>
      </Card>
      <Card title="Form Appearance">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Title level={5}>Color Scheme</Title>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            <Form.Item label="Primary Color">
              <ColorPicker
                value={formSettings.primaryColor}
                onChange={(color) =>
                  updateFormSetting("primaryColor", color.toHexString())
                }
                showText
                size="large"
                presets={[
                  {
                    label: "Recommended",
                    colors: [
                      "#667eea",
                      "#764ba2",
                      "#f093fb",
                      "#f5576c",
                      "#4facfe",
                      "#00f2fe",
                      "#43e97b",
                      "#38f9d7",
                      "#ffecd2",
                      "#fcb69f",
                    ],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Secondary Color">
              <ColorPicker
                value={formSettings.secondaryColor}
                onChange={(color) =>
                  updateFormSetting("secondaryColor", color.toHexString())
                }
                showText
                size="large"
                presets={[
                  {
                    label: "Recommended",
                    colors: [
                      "#764ba2",
                      "#667eea",
                      "#f5576c",
                      "#f093fb",
                      "#00f2fe",
                      "#4facfe",
                      "#38f9d7",
                      "#43e97b",
                      "#fcb69f",
                      "#ffecd2",
                    ],
                  },
                ]}
              />
            </Form.Item>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            <Form.Item label="Background Color">
              <ColorPicker
                value={formSettings.backgroundColor}
                onChange={(color) =>
                  updateFormSetting("backgroundColor", color.toHexString())
                }
                showText
                size="large"
                presets={[
                  {
                    label: "Backgrounds",
                    colors: [
                      "#ffffff",
                      "#f8f9fa",
                      "#f5f5f5",
                      "#e9ecef",
                      "#dee2e6",
                      "#ced4da",
                      "#adb5bd",
                      "#6c757d",
                      "#495057",
                      "#343a40",
                    ],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Text Color">
              <ColorPicker
                value={formSettings.textColor || "#2c3e50"}
                onChange={(color) =>
                  updateFormSetting("textColor", color.toHexString())
                }
                showText
                size="large"
                presets={[
                  {
                    label: "Text Colors",
                    colors: [
                      "#000000",
                      "#2c3e50",
                      "#34495e",
                      "#7f8c8d",
                      "#95a5a6",
                      "#bdc3c7",
                      "#ecf0f1",
                      "#ffffff",
                      "#e74c3c",
                      "#3498db",
                    ],
                  },
                ]}
              />
            </Form.Item>
          </div>

          <Form.Item label="Button Color">
            <ColorPicker
              value={formSettings.buttonColor || formSettings.primaryColor}
              onChange={(color) =>
                updateFormSetting("buttonColor", color.toHexString())
              }
              showText
              size="large"
              presets={[
                {
                  label: "Button Colors",
                  colors: [
                    "#667eea",
                    "#28a745",
                    "#007bff",
                    "#17a2b8",
                    "#ffc107",
                    "#fd7e14",
                    "#e83e8c",
                    "#6f42c1",
                    "#20c997",
                    "#6c757d",
                  ],
                },
              ]}
            />
          </Form.Item>

          <Divider />

          <Title level={5}>Border Settings</Title>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            <Form.Item label="Border Color">
              <ColorPicker
                value={formSettings.borderColor}
                onChange={(color) =>
                  updateFormSetting("borderColor", color.toHexString())
                }
                showText
                size="large"
                presets={[
                  {
                    label: "Border Colors",
                    colors: [
                      "#e1e8ed",
                      "#d1d9e0",
                      "#b8c5d1",
                      "#9fb1c2",
                      "#869db3",
                      "#6d89a4",
                      "#547595",
                      "#3b6186",
                      "#224d77",
                      "#093968",
                    ],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Border Style">
              <Select
                value={formSettings.borderStyle}
                onChange={(value) => updateFormSetting("borderStyle", value)}
                style={{ width: "100%" }}
                options={[
                  { value: "solid", label: "Solid" },
                  { value: "dashed", label: "Dashed" },
                  { value: "dotted", label: "Dotted" },
                  { value: "double", label: "Double" },
                  { value: "groove", label: "Groove" },
                  { value: "ridge", label: "Ridge" },
                  { value: "inset", label: "Inset" },
                  { value: "outset", label: "Outset" },
                  { value: "none", label: "None" },
                ]}
              />
            </Form.Item>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            <Form.Item label="Border Width (px)">
              <Slider
                min={0}
                max={10}
                value={formSettings.borderWidth}
                onChange={(value) => updateFormSetting("borderWidth", value)}
                marks={{
                  0: "0",
                  1: "1",
                  2: "2",
                  3: "3",
                  4: "4",
                  5: "5",
                  6: "6",
                  7: "7",
                  8: "8",
                  9: "9",
                  10: "10",
                }}
              />
            </Form.Item>
            <Form.Item label="Border Radius (px)">
              <Slider
                min={0}
                max={30}
                value={formSettings.borderRadius}
                onChange={(value) => updateFormSetting("borderRadius", value)}
                marks={{
                  0: "0",
                  5: "5",
                  10: "10",
                  15: "15",
                  20: "20",
                  25: "25",
                  30: "30",
                }}
              />
            </Form.Item>
          </div>

          <Divider />

          <Title level={5}>Input Field Settings</Title>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            <Form.Item label="Input Background">
              <ColorPicker
                value={formSettings.inputBackground || "#ffffff"}
                onChange={(color) =>
                  updateFormSetting("inputBackground", color.toHexString())
                }
                showText
                size="large"
                presets={[
                  {
                    label: "Input Backgrounds",
                    colors: [
                      "#ffffff",
                      "#f8f9fa",
                      "#f5f5f5",
                      "#e9ecef",
                      "#dee2e6",
                      "#ced4da",
                      "#adb5bd",
                      "#6c757d",
                      "#495057",
                      "#343a40",
                    ],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Input Border Color">
              <ColorPicker
                value={
                  formSettings.inputBorderColor || formSettings.borderColor
                }
                onChange={(color) =>
                  updateFormSetting("inputBorderColor", color.toHexString())
                }
                showText
                size="large"
                presets={[
                  {
                    label: "Input Border Colors",
                    colors: [
                      "#d9d9d9",
                      "#bfbfbf",
                      "#a6a6a6",
                      "#8c8c8c",
                      "#737373",
                      "#595959",
                      "#404040",
                      "#262626",
                      "#1f1f1f",
                      "#141414",
                    ],
                  },
                ]}
              />
            </Form.Item>
          </div>

          <Divider />

          <Title level={5}>Quick Themes</Title>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: 16,
            }}
          >
            <Button
              onClick={() => {
                updateFormSetting("primaryColor", "#667eea");
                updateFormSetting("secondaryColor", "#764ba2");
                updateFormSetting("backgroundColor", "#f8f9fa");
                updateFormSetting("borderColor", "#e1e8ed");
                updateFormSetting("textColor", "#2c3e50");
                updateFormSetting("buttonColor", "#667eea");
              }}
              style={{
                height: 60,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
              }}
            >
              Default
            </Button>
            <Button
              onClick={() => {
                updateFormSetting("primaryColor", "#28a745");
                updateFormSetting("secondaryColor", "#20c997");
                updateFormSetting("backgroundColor", "#f8fff9");
                updateFormSetting("borderColor", "#c3e6cb");
                updateFormSetting("textColor", "#155724");
                updateFormSetting("buttonColor", "#28a745");
              }}
              style={{
                height: 60,
                background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                color: "white",
                border: "none",
              }}
            >
              Nature
            </Button>
            <Button
              onClick={() => {
                updateFormSetting("primaryColor", "#007bff");
                updateFormSetting("secondaryColor", "#17a2b8");
                updateFormSetting("backgroundColor", "#f8f9ff");
                updateFormSetting("borderColor", "#b8daff");
                updateFormSetting("textColor", "#004085");
                updateFormSetting("buttonColor", "#007bff");
              }}
              style={{
                height: 60,
                background: "linear-gradient(135deg, #007bff 0%, #17a2b8 100%)",
                color: "white",
                border: "none",
              }}
            >
              Ocean
            </Button>
            <Button
              onClick={() => {
                updateFormSetting("primaryColor", "#e83e8c");
                updateFormSetting("secondaryColor", "#fd7e14");
                updateFormSetting("backgroundColor", "#fff8f9");
                updateFormSetting("borderColor", "#f1aeb5");
                updateFormSetting("textColor", "#721c24");
                updateFormSetting("buttonColor", "#e83e8c");
              }}
              style={{
                height: 60,
                background: "linear-gradient(135deg, #e83e8c 0%, #fd7e14 100%)",
                color: "white",
                border: "none",
              }}
            >
              Sunset
            </Button>
            <Button
              onClick={() => {
                updateFormSetting("primaryColor", "#6f42c1");
                updateFormSetting("secondaryColor", "#e83e8c");
                updateFormSetting("backgroundColor", "#faf9ff");
                updateFormSetting("borderColor", "#c7a2ea");
                updateFormSetting("textColor", "#3d1a78");
                updateFormSetting("buttonColor", "#6f42c1");
              }}
              style={{
                height: 60,
                background: "linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%)",
                color: "white",
                border: "none",
              }}
            >
              Purple
            </Button>
            <Button
              onClick={() => {
                updateFormSetting("primaryColor", "#343a40");
                updateFormSetting("secondaryColor", "#6c757d");
                updateFormSetting("backgroundColor", "#ffffff");
                updateFormSetting("borderColor", "#dee2e6");
                updateFormSetting("textColor", "#212529");
                updateFormSetting("buttonColor", "#343a40");
              }}
              style={{
                height: 60,
                background: "linear-gradient(135deg, #343a40 0%, #6c757d 100%)",
                color: "white",
                border: "none",
              }}
            >
              Dark
            </Button>
          </div>

          <Divider />

          <Title level={5}>Typography</Title>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            <Form.Item label="Font Size (px)">
              <Slider
                min={12}
                max={24}
                value={formSettings.fontSize}
                onChange={(value) => updateFormSetting("fontSize", value)}
                marks={{
                  12: "12",
                  14: "14",
                  16: "16",
                  18: "18",
                  20: "20",
                  22: "22",
                  24: "24",
                }}
              />
            </Form.Item>
          </div>

          <Form.Item label="Font Weight">
            <Select
              value={formSettings.fontWeight || "400"}
              onChange={(value) => updateFormSetting("fontWeight", value)}
              style={{ width: "100%" }}
              options={[
                { value: "300", label: "Light (300)" },
                { value: "400", label: "Normal (400)" },
                { value: "500", label: "Medium (500)" },
                { value: "600", label: "Semi Bold (600)" },
                { value: "700", label: "Bold (700)" },
                { value: "800", label: "Extra Bold (800)" },
              ]}
            />
          </Form.Item>

          <Divider />

          <Title level={5}>Shadow & Effects</Title>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            <Form.Item label="Box Shadow">
              <Select
                value={formSettings.boxShadow || "none"}
                onChange={(value) => updateFormSetting("boxShadow", value)}
                style={{ width: "100%" }}
                options={[
                  { value: "none", label: "None" },
                  { value: "0 1px 3px rgba(0,0,0,0.12)", label: "Light" },
                  { value: "0 4px 6px rgba(0,0,0,0.1)", label: "Medium" },
                  { value: "0 10px 25px rgba(0,0,0,0.15)", label: "Heavy" },
                  {
                    value: "0 20px 40px rgba(0,0,0,0.2)",
                    label: "Extra Heavy",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Hover Effect">
              <Select
                value={formSettings.hoverEffect || "none"}
                onChange={(value) => updateFormSetting("hoverEffect", value)}
                style={{ width: "100%" }}
                options={[
                  { value: "none", label: "None" },
                  { value: "lift", label: "Lift" },
                  { value: "glow", label: "Glow" },
                  { value: "scale", label: "Scale" },
                  { value: "border", label: "Border Highlight" },
                ]}
              />
            </Form.Item>
          </div>
        </Space>
      </Card>
    </Space>
  );
};

export default Settings;
