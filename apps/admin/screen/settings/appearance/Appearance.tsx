"use client";

import {
  Button,
  Card,
  ColorPicker,
  Divider,
  Form,
  Select,
  Slider,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import type { EntityTheme } from "../../../store/ts-types";
import { editEntityTheme } from "../../../graphql/actions/theme";
import { useThemeStore } from "../../../store/themeStore";

const Settings = ({ theme }: { theme: EntityTheme | null }) => {
  useEffect(() => {
    if (theme) {
      // Remove __typename from theme and theme.Button if present
      const { __typename, Button, ...restTheme } = theme as any;
      const { __typename: btnTypename, ...restButton } = (Button || {}) as any;

      setFormSettings((prev) => ({
        ...prev,
        ...restTheme,
        Button: {
          ...prev.Button,
          ...restButton,
        },
      }));
    }
  }, [theme]);

  const [formSettings, setFormSettings] = useState<EntityTheme>({
    // Provide a default or placeholder value as needed
    primaryColor: "#667eea",
    secondaryColor: "#764ba2",
    backgroundColor: "#f8f9fa",
    textColor: "#2c3e50",
    buttonColor: "#667eea",
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#e1e8ed",
    inputBackground: "#ffffff",
    inputBorderColor: "#d9d9d9",
    fontSize: 16,
    fontWeight: "400",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
    hoverEffect: "none",
    Button: {
      colorPrimary: "#667eea",
      colorText: "#ffffff",
      colorBorder: "#667eea",
      borderRadius: 8,
      defaultBg: "#f0f0f0",
      defaultColor: "#000000",
      defaultBorderColor: "#d9d9d9",
      fontSize: 16,
    },
  });

  const setTheme = useThemeStore((state) => state.setTheme);

  const onCompleted = () => {
    setTheme({
      ...formSettings,
      borderRadius: String(formSettings.borderRadius),
      borderWidth: String(formSettings.borderWidth),
      fontSize: String(formSettings.fontSize),
      Button: {
        colorPrimary: formSettings.Button?.colorPrimary ?? "#667eea",
        colorText: formSettings.Button?.colorText ?? "#ffffff",
        colorBorder: formSettings.Button?.colorBorder ?? "#667eea",
        borderRadius: formSettings.Button?.borderRadius ?? 8,
        defaultBg: formSettings.Button?.defaultBg ?? "#f0f0f0",
        defaultColor: formSettings.Button?.defaultColor ?? "#000000",
        defaultBorderColor:
          formSettings.Button?.defaultBorderColor ?? "#d9d9d9",
        fontSize: formSettings.Button?.fontSize ?? 16,
      },
    });
  };
  const [update, { loading }] = editEntityTheme({
    onCompleted,
  });

  const updateFormSetting = <K extends keyof EntityTheme>(
    key: K,
    value: EntityTheme[K]
  ) => {
    setFormSettings((prev) => ({
      ...prev,
      [key]:
        typeof value === "object" &&
        value !== null &&
        typeof prev[key] === "object" &&
        prev[key] !== null
          ? { ...prev[key], ...value }
          : value,
    }));
  };

  console.log(formSettings);
  const { Title, Text } = Typography;
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card
        title="Form Appearance"
        extra={
          <Button
            onClick={() => {
              update({
                variables: {
                  input: formSettings,
                },
              });
            }}
            loading={loading}
            type="primary"
            disabled={JSON.stringify(formSettings) === JSON.stringify(theme)}
          >
            Save
          </Button>
        }
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
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
                updateFormSetting("Button", {
                  ...formSettings.Button,
                  colorPrimary: "#667eea",
                  colorText: "#ffffff",
                  colorBorder: "#667eea",
                  defaultBg: "#f0f0f0",
                  defaultColor: "#000000",
                  defaultBorderColor: "#d9d9d9",
                });
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
                updateFormSetting("Button", {
                  ...formSettings.Button,
                  colorPrimary: "#28a745",
                  colorText: "#ffffff",
                  colorBorder: "#28a745",
                  defaultBg: "#f0f0f0",
                  defaultColor: "#000000",
                  defaultBorderColor: "#d9d9d9",
                });
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
                updateFormSetting("Button", {
                  ...formSettings.Button,
                  colorPrimary: "#007bff",
                  colorText: "#ffffff",
                  colorBorder: "#007bff",
                  defaultBg: "#f0f0f0",
                  defaultColor: "#000000",
                  defaultBorderColor: "#d9d9d9",
                });
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
                updateFormSetting("Button", {
                  ...formSettings.Button,
                  colorPrimary: "#e83e8c",
                  colorText: "#ffffff",
                  colorBorder: "#e83e8c",
                  defaultBg: "#f0f0f0",
                  defaultColor: "#000000",
                  defaultBorderColor: "#d9d9d9",
                });
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
                updateFormSetting("Button", {
                  ...formSettings.Button,
                  colorPrimary: "#6f42c1",
                  colorText: "#ffffff",
                  colorBorder: "#6f42c1",
                  defaultBg: "#f0f0f0",
                  defaultColor: "#000000",
                  defaultBorderColor: "#d9d9d9",
                });
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
                updateFormSetting("Button", {
                  ...formSettings.Button,
                  colorPrimary: "#343a40",
                  colorText: "#ffffff",
                  colorBorder: "#343a40",
                  defaultBg: "#f0f0f0",
                  defaultColor: "#000000",
                  defaultBorderColor: "#d9d9d9",
                });
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
          <Divider />

          <Title level={5}>Button Settings</Title>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            <Form.Item label="Primary Button Color">
              <ColorPicker
                value={formSettings.Button?.colorPrimary || "#667eea"}
                onChange={(color) =>
                  updateFormSetting("Button", {
                    ...formSettings.Button,
                    colorPrimary: color.toHexString(),
                  })
                }
                showText
                size="large"
              />
            </Form.Item>
            <Form.Item label="Button Text Color">
              <ColorPicker
                value={formSettings.Button?.colorText || "#ffffff"}
                onChange={(color) =>
                  updateFormSetting("Button", {
                    ...formSettings.Button,
                    colorText: color.toHexString(),
                  })
                }
                showText
                size="large"
              />
            </Form.Item>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            <Form.Item label="Button Border Color">
              <ColorPicker
                value={formSettings.Button?.colorBorder || "#667eea"}
                onChange={(color) =>
                  updateFormSetting("Button", {
                    ...formSettings.Button,
                    colorBorder: color.toHexString(),
                  })
                }
                showText
                size="large"
              />
            </Form.Item>
            <Form.Item label="Button Border Radius">
              <Slider
                min={0}
                max={20}
                value={formSettings.Button?.borderRadius || 8}
                onChange={(value) =>
                  updateFormSetting("Button", {
                    ...formSettings.Button,
                    borderRadius: value,
                  })
                }
                marks={{
                  0: "0",
                  4: "4",
                  8: "8",
                  12: "12",
                  16: "16",
                  20: "20",
                }}
              />
            </Form.Item>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            <Form.Item label="Default Button Background">
              <ColorPicker
                value={formSettings.Button?.defaultBg || "#f0f0f0"}
                onChange={(color) =>
                  updateFormSetting("Button", {
                    ...formSettings.Button,
                    defaultBg: color.toHexString(),
                  })
                }
                showText
                size="large"
              />
            </Form.Item>
            <Form.Item label="Default Button Text Color">
              <ColorPicker
                value={formSettings.Button?.defaultColor || "#000000"}
                onChange={(color) =>
                  updateFormSetting("Button", {
                    ...formSettings.Button,
                    defaultColor: color.toHexString(),
                  })
                }
                showText
                size="large"
              />
            </Form.Item>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            <Form.Item label="Default Button Border">
              <ColorPicker
                value={formSettings.Button?.defaultBorderColor || "#d9d9d9"}
                onChange={(color) =>
                  updateFormSetting("Button", {
                    ...formSettings.Button,
                    defaultBorderColor: color.toHexString(),
                  })
                }
                showText
                size="large"
              />
            </Form.Item>
            <Form.Item label="Button Font Size">
              <Slider
                min={12}
                max={20}
                value={formSettings.Button?.fontSize || 16}
                onChange={(value) =>
                  updateFormSetting("Button", {
                    ...formSettings.Button,
                    fontSize: value,
                  })
                }
                marks={{
                  12: "12",
                  14: "14",
                  16: "16",
                  18: "18",
                  20: "20",
                }}
              />
            </Form.Item>
          </div>
        </Space>
      </Card>
    </Space>
  );
};

export default Settings;
