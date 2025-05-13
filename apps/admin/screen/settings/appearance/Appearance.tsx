"use client";

import { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Slider,
  Tabs,
  Button,
  Space,
  Card,
  Divider,
  Typography,
  Switch,
  message,
  ColorPicker,
} from "antd";
import {
  CopyOutlined,
  DownloadOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { ConfigProvider } from "antd";
import Paragraph from "antd/es/typography/Paragraph";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Default theme based on the values provided earlier
const defaultTheme = {
  token: {
    colorPrimary: "#3B82F6",
    colorSuccess: "#10B981",
    colorWarning: "#F59E0B",
    colorError: "#EF4444",
    colorInfo: "#3B82F6",
    colorTextBase: "#111827",
    colorBgBase: "#F9FAFB",
    colorBorder: "#E5E7EB",
    colorBgContainer: "#FFFFFF",
    colorBgElevated: "#FFFFFF",
    colorBgLayout: "#F9FAFB",
    colorBgSpotlight: "#F3F4F6",
    colorBgMask: "rgba(0, 0, 0, 0.45)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontSize: 14,
    fontSizeSM: 12,
    fontSizeLG: 16,
    fontSizeXL: 20,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,
    lineHeight: 1.5715,
    borderRadius: 6,
    borderRadiusSM: 4,
    borderRadiusLG: 8,
    borderRadiusXL: 12,
    sizeUnit: 4,
    sizeStep: 4,
    sizeS: 24,
    sizeM: 32,
    sizeL: 40,
    sizeXL: 48,
    controlHeight: 32,
    controlHeightSM: 24,
    controlHeightLG: 40,
    controlHeightXS: 16,
    controlPaddingHorizontal: 12,
    controlPaddingHorizontalSM: 8,
    boxShadow:
      "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
    boxShadowSecondary:
      "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
  },
  components: {
    Button: {
      colorPrimary: "#3B82F6",
      algorithm: true,
    },
    Menu: {
      colorItemBg: "transparent",
      colorActiveBarBorderSize: 0,
      colorItemBgSelected: "rgba(59, 130, 246, 0.1)",
      colorItemTextSelected: "#3B82F6",
    },
    Card: {
      colorBorderSecondary: "#E5E7EB",
      borderRadiusLG: 8,
    },
    Table: {
      colorBgContainer: "#FFFFFF",
      borderRadius: 8,
    },
    Select: {
      controlItemBgActive: "rgba(59, 130, 246, 0.1)",
      controlItemBgHover: "rgba(59, 130, 246, 0.05)",
    },
    Input: {
      activeBorderColor: "#3B82F6",
      hoverBorderColor: "#60A5FA",
    },
    Tabs: {
      inkBarColor: "#3B82F6",
      itemSelectedColor: "#3B82F6",
      itemHoverColor: "#60A5FA",
    },
  },
};

// Convert theme to Less format
const convertToLess = (theme) => {
  let lessCode = "";

  // Add token variables
  lessCode += "// Colors\n";
  lessCode += `@primary-color: ${theme.token.colorPrimary};\n`;
  lessCode += `@success-color: ${theme.token.colorSuccess};\n`;
  lessCode += `@warning-color: ${theme.token.colorWarning};\n`;
  lessCode += `@error-color: ${theme.token.colorError};\n`;
  lessCode += `@info-color: ${theme.token.colorInfo};\n\n`;

  lessCode += "// Base colors\n";
  lessCode += `@body-background: ${theme.token.colorBgBase};\n`;
  lessCode += `@component-background: ${theme.token.colorBgContainer};\n`;
  lessCode += `@text-color: ${theme.token.colorTextBase};\n`;
  lessCode += `@text-color-secondary: rgba(17, 24, 39, 0.65);\n`;
  lessCode += `@heading-color: ${theme.token.colorTextBase};\n`;
  lessCode += `@border-color-base: ${theme.token.colorBorder};\n`;
  lessCode += `@border-color-split: ${theme.token.colorBgSpotlight};\n`;
  lessCode += `@layout-body-background: ${theme.token.colorBgLayout};\n\n`;

  lessCode += "// Font\n";
  lessCode += `@font-family: ${theme.token.fontFamily};\n`;
  lessCode += `@font-size-base: ${theme.token.fontSize}px;\n`;
  lessCode += `@font-size-sm: ${theme.token.fontSizeSM}px;\n`;
  lessCode += `@font-size-lg: ${theme.token.fontSizeLG}px;\n`;
  lessCode += `@heading-1-size: ${theme.token.fontSizeHeading1}px;\n`;
  lessCode += `@heading-2-size: ${theme.token.fontSizeHeading2}px;\n`;
  lessCode += `@heading-3-size: ${theme.token.fontSizeHeading3}px;\n`;
  lessCode += `@heading-4-size: ${theme.token.fontSizeHeading4}px;\n`;
  lessCode += `@heading-5-size: ${theme.token.fontSizeHeading5}px;\n`;
  lessCode += `@line-height-base: ${theme.token.lineHeight};\n\n`;

  lessCode += "// Border radius\n";
  lessCode += `@border-radius-base: ${theme.token.borderRadius}px;\n`;
  lessCode += `@border-radius-sm: ${theme.token.borderRadiusSM}px;\n`;
  lessCode += `@border-radius-lg: ${theme.token.borderRadiusLG}px;\n\n`;

  lessCode += "// Buttons\n";
  lessCode += `@btn-font-weight: 500;\n`;
  lessCode += `@btn-border-radius-base: ${theme.token.borderRadius}px;\n`;
  lessCode += `@btn-border-radius-sm: ${theme.token.borderRadiusSM}px;\n`;
  lessCode += `@btn-primary-color: #FFFFFF;\n`;
  lessCode += `@btn-primary-bg: @primary-color;\n`;
  lessCode += `@btn-default-color: @text-color;\n`;
  lessCode += `@btn-default-bg: #FFFFFF;\n`;
  lessCode += `@btn-default-border: @border-color-base;\n\n`;

  lessCode += "// Shadows\n";
  lessCode += `@box-shadow-base: ${theme.token.boxShadow};\n`;
  lessCode += `@shadow-2: ${theme.token.boxShadowSecondary};\n\n`;

  // Add component-specific variables
  if (theme.components) {
    Object.keys(theme.components).forEach((component) => {
      lessCode += `// ${component}\n`;
      const componentVars = theme.components[component];
      Object.keys(componentVars).forEach((key) => {
        if (key !== "algorithm") {
          lessCode += `@${component.toLowerCase()}-${key}: ${componentVars[key]};\n`;
        }
      });
      lessCode += "\n";
    });
  }

  return lessCode;
};

export default function ThemeCustomizer() {
  const [form] = Form.useForm();
  const [theme, setTheme] = useState(defaultTheme);
  const [outputFormat, setOutputFormat] = useState("json");
  const [messageApi, contextHolder] = message.useMessage();
  const values = form.getFieldsValue();
  console.log(values);
  // Initialize form with default values
  useEffect(() => {
    form.setFieldsValue({
      token: { ...theme.token },
      components: { ...theme.components },
    });
  }, []);

  const handleValuesChange = (changedValues, allValues) => {
    setTheme(allValues);
  };

  const handleReset = () => {
    form.setFieldsValue({
      token: { ...defaultTheme.token },
      components: { ...defaultTheme.components },
    });
    setTheme(defaultTheme);
    messageApi.success("Theme reset to default values");
  };

  const copyToClipboard = () => {
    const output =
      outputFormat === "json"
        ? JSON.stringify(theme, null, 2)
        : convertToLess(theme);

    navigator.clipboard
      .writeText(output)
      .then(() => {
        messageApi.success(
          `Theme copied to clipboard in ${outputFormat.toUpperCase()} format`
        );
      })
      .catch(() => {
        messageApi.error("Failed to copy to clipboard");
      });
  };

  const downloadTheme = () => {
    const output =
      outputFormat === "json"
        ? JSON.stringify(theme, null, 2)
        : convertToLess(theme);

    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = outputFormat === "json" ? "theme.json" : "theme.less";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    messageApi.success(
      `Theme downloaded in ${outputFormat.toUpperCase()} format`
    );
  };

  // Preview components with current theme
  const PreviewComponents = () => (
    <ConfigProvider
      theme={{
        token: theme.token,
        components: theme.components,
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card title="Button Preview" bordered={false}>
          <Space>
            <Button type="primary">Primary Button</Button>
            <Button>Default Button</Button>
            <Button type="dashed">Dashed Button</Button>
            <Button type="text">Text Button</Button>
            <Button type="link">Link Button</Button>
          </Space>
        </Card>

        <Card title="Form Elements" bordered={false}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Input placeholder="Input field" />
            <Space>
              <Switch defaultChecked />
              <Slider defaultValue={30} style={{ width: 200 }} />
            </Space>
          </Space>
        </Card>

        <Title>h1. Ant Design</Title>
        <Title level={2}>h2. Ant Design</Title>
        <Title level={3}>h3. Ant Design</Title>
        <Title level={4}>h4. Ant Design</Title>
        <Title level={5}>h5. Ant Design</Title>
        <Paragraph>
          Ant Design, a design language for background applications, is refined
          by Ant UED Team. Ant Design, a design language for background
          applications, is refined by Ant UED Team. Ant Design, a design
          language for background applications, is refined by Ant UED Team. Ant
          Design, a design language for background applications, is refined by
          Ant UED Team. Ant Design, a design language for background
          applications, is refined by Ant UED Team. Ant Design, a design
          language for background applications, is refined by Ant UED Team.
        </Paragraph>
      </Space>
    </ConfigProvider>
  );

  return (
    <div style={{ padding: "24px", width: "100%", margin: "0 auto" }}>
      {contextHolder}
      <Card>
        <Title level={2}> Theme Customizer</Title>

        <div
          style={{
            marginTop: "24px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Space>
            <Button icon={<UndoOutlined />} onClick={handleReset}>
              Reset to Default
            </Button>
          </Space>
        </div>

        <Divider />

        <Tabs defaultActiveKey="1">
          <TabPane tab="Edit Theme" key="1">
            <Form
              form={form}
              layout="vertical"
              initialValues={theme}
              onValuesChange={handleValuesChange}
              style={{ maxWidth: "100%" }}
            >
              <Tabs defaultActiveKey="colors">
                <TabPane tab="Colors" key="colors">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(250px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    <Form.Item
                      label="Primary Color"
                      name={["token", "colorPrimary"]}
                    >
                      <ColorPicker
                        showText
                        onChange={(color) => {
                          form.setFieldValue(
                            ["token", "colorPrimary"],
                            color.toHexString()
                          );
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Success Color"
                      name={["token", "colorSuccess"]}
                    >
                      <ColorPicker showText />
                    </Form.Item>
                    <Form.Item
                      label="Warning Color"
                      name={["token", "colorWarning"]}
                    >
                      <ColorPicker showText />
                    </Form.Item>
                    <Form.Item
                      label="Error Color"
                      name={["token", "colorError"]}
                    >
                      <ColorPicker showText />
                    </Form.Item>
                    <Form.Item label="Info Color" name={["token", "colorInfo"]}>
                      <ColorPicker showText />
                    </Form.Item>
                    <Form.Item
                      label="Text Color"
                      name={["token", "colorTextBase"]}
                    >
                      <ColorPicker showText />
                    </Form.Item>
                    <Form.Item
                      label="Background Color"
                      name={["token", "colorBgBase"]}
                    >
                      <ColorPicker showText />
                    </Form.Item>
                    <Form.Item
                      label="Border Color"
                      name={["token", "colorBorder"]}
                    >
                      <ColorPicker showText />
                    </Form.Item>
                    <Form.Item
                      label="Container Background"
                      name={["token", "colorBgContainer"]}
                    >
                      <ColorPicker showText />
                    </Form.Item>
                    <Form.Item
                      label="Elevated Background"
                      name={["token", "colorBgElevated"]}
                    >
                      <ColorPicker showText />
                    </Form.Item>
                    <Form.Item
                      label="Layout Background"
                      name={["token", "colorBgLayout"]}
                    >
                      <ColorPicker showText />
                    </Form.Item>
                    <Form.Item
                      label="Spotlight Background"
                      name={["token", "colorBgSpotlight"]}
                    >
                      <ColorPicker showText />
                    </Form.Item>
                  </div>
                </TabPane>

                <TabPane tab="Typography" key="typography">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(250px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    <Form.Item
                      label="Font Family"
                      name={["token", "fontFamily"]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Base Font Size"
                      name={["token", "fontSize"]}
                    >
                      <InputNumber min={10} max={24} />
                    </Form.Item>
                    <Form.Item
                      label="Small Font Size"
                      name={["token", "fontSizeSM"]}
                    >
                      <InputNumber min={8} max={20} />
                    </Form.Item>
                    <Form.Item
                      label="Large Font Size"
                      name={["token", "fontSizeLG"]}
                    >
                      <InputNumber min={14} max={28} />
                    </Form.Item>
                    <Form.Item
                      label="Extra Large Font Size"
                      name={["token", "fontSizeXL"]}
                    >
                      <InputNumber min={16} max={32} />
                    </Form.Item>
                    <Form.Item
                      label="Heading 1 Size"
                      name={["token", "fontSizeHeading1"]}
                    >
                      <InputNumber min={24} max={60} />
                    </Form.Item>
                    <Form.Item
                      label="Heading 2 Size"
                      name={["token", "fontSizeHeading2"]}
                    >
                      <InputNumber min={20} max={48} />
                    </Form.Item>
                    <Form.Item
                      label="Heading 3 Size"
                      name={["token", "fontSizeHeading3"]}
                    >
                      <InputNumber min={18} max={40} />
                    </Form.Item>
                    <Form.Item
                      label="Heading 4 Size"
                      name={["token", "fontSizeHeading4"]}
                    >
                      <InputNumber min={16} max={32} />
                    </Form.Item>
                    <Form.Item
                      label="Heading 5 Size"
                      name={["token", "fontSizeHeading5"]}
                    >
                      <InputNumber min={14} max={28} />
                    </Form.Item>
                    <Form.Item
                      label="Line Height"
                      name={["token", "lineHeight"]}
                    >
                      <InputNumber min={1} max={2} step={0.05} />
                    </Form.Item>
                  </div>
                </TabPane>

                <TabPane tab="Sizing & Borders" key="sizing">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(250px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    <Form.Item
                      label="Border Radius"
                      name={["token", "borderRadius"]}
                    >
                      <InputNumber min={0} max={24} />
                    </Form.Item>
                    <Form.Item
                      label="Small Border Radius"
                      name={["token", "borderRadiusSM"]}
                    >
                      <InputNumber min={0} max={20} />
                    </Form.Item>
                    <Form.Item
                      label="Large Border Radius"
                      name={["token", "borderRadiusLG"]}
                    >
                      <InputNumber min={0} max={32} />
                    </Form.Item>
                    <Form.Item
                      label="Extra Large Border Radius"
                      name={["token", "borderRadiusXL"]}
                    >
                      <InputNumber min={0} max={40} />
                    </Form.Item>
                    <Form.Item label="Size Unit" name={["token", "sizeUnit"]}>
                      <InputNumber min={1} max={8} />
                    </Form.Item>
                    <Form.Item label="Size Step" name={["token", "sizeStep"]}>
                      <InputNumber min={1} max={8} />
                    </Form.Item>
                    <Form.Item label="Size S" name={["token", "sizeS"]}>
                      <InputNumber min={16} max={40} />
                    </Form.Item>
                    <Form.Item label="Size M" name={["token", "sizeM"]}>
                      <InputNumber min={24} max={48} />
                    </Form.Item>
                    <Form.Item label="Size L" name={["token", "sizeL"]}>
                      <InputNumber min={32} max={56} />
                    </Form.Item>
                    <Form.Item label="Size XL" name={["token", "sizeXL"]}>
                      <InputNumber min={40} max={64} />
                    </Form.Item>
                    <Form.Item
                      label="Control Height"
                      name={["token", "controlHeight"]}
                    >
                      <InputNumber min={24} max={48} />
                    </Form.Item>
                    <Form.Item
                      label="Small Control Height"
                      name={["token", "controlHeightSM"]}
                    >
                      <InputNumber min={16} max={32} />
                    </Form.Item>
                    <Form.Item
                      label="Large Control Height"
                      name={["token", "controlHeightLG"]}
                    >
                      <InputNumber min={32} max={56} />
                    </Form.Item>
                  </div>
                </TabPane>

                <TabPane tab="Components" key="components">
                  <Tabs defaultActiveKey="button">
                    <TabPane tab="Button" key="button">
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(250px, 1fr))",
                          gap: "16px",
                        }}
                      >
                        <Form.Item
                          label="Primary Color"
                          name={["components", "Button", "colorPrimary"]}
                        >
                          <ColorPicker showText />
                        </Form.Item>
                      </div>
                    </TabPane>

                    <TabPane tab="Menu" key="menu">
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(250px, 1fr))",
                          gap: "16px",
                        }}
                      >
                        <Form.Item
                          label="Item Background"
                          name={["components", "Menu", "colorItemBg"]}
                        >
                          <ColorPicker showText />
                        </Form.Item>
                        <Form.Item
                          label="Active Bar Border Size"
                          name={[
                            "components",
                            "Menu",
                            "colorActiveBarBorderSize",
                          ]}
                        >
                          <InputNumber min={0} max={10} />
                        </Form.Item>
                        <Form.Item
                          label="Selected Item Background"
                          name={["components", "Menu", "colorItemBgSelected"]}
                        >
                          <ColorPicker showText />
                        </Form.Item>
                        <Form.Item
                          label="Selected Item Text"
                          name={["components", "Menu", "colorItemTextSelected"]}
                        >
                          <ColorPicker showText />
                        </Form.Item>
                      </div>
                    </TabPane>

                    <TabPane tab="Card" key="card">
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(250px, 1fr))",
                          gap: "16px",
                        }}
                      >
                        <Form.Item
                          label="Secondary Border Color"
                          name={["components", "Card", "colorBorderSecondary"]}
                        >
                          <ColorPicker
                            showText
                            onChange={(color) => {
                              form.setFieldValue(
                                ["components", "Card", "colorBorderSecondary"],
                                color.toHexString()
                              );
                            }}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Large Border Radius"
                          name={["components", "Card", "borderRadiusLG"]}
                        >
                          <InputNumber min={0} max={24} />
                        </Form.Item>
                      </div>
                    </TabPane>

                    <TabPane tab="Table" key="table">
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(250px, 1fr))",
                          gap: "16px",
                        }}
                      >
                        <Form.Item
                          label="Container Background"
                          name={["components", "Table", "colorBgContainer"]}
                        >
                          <ColorPicker showText />
                        </Form.Item>
                        <Form.Item
                          label="Border Radius"
                          name={["components", "Table", "borderRadius"]}
                        >
                          <InputNumber min={0} max={24} />
                        </Form.Item>
                      </div>
                    </TabPane>

                    <TabPane tab="Select" key="select">
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(250px, 1fr))",
                          gap: "16px",
                        }}
                      >
                        <Form.Item
                          label="Active Item Background"
                          name={["components", "Select", "controlItemBgActive"]}
                        >
                          <ColorPicker showText />
                        </Form.Item>
                        <Form.Item
                          label="Hover Item Background"
                          name={["components", "Select", "controlItemBgHover"]}
                        >
                          <ColorPicker showText />
                        </Form.Item>
                      </div>
                    </TabPane>

                    <TabPane tab="Input" key="input">
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(250px, 1fr))",
                          gap: "16px",
                        }}
                      >
                        <Form.Item
                          label="Active Border Color"
                          name={["components", "Input", "activeBorderColor"]}
                        >
                          <ColorPicker showText />
                        </Form.Item>
                        <Form.Item
                          label="Hover Border Color"
                          name={["components", "Input", "hoverBorderColor"]}
                        >
                          <ColorPicker showText />
                        </Form.Item>
                      </div>
                    </TabPane>

                    <TabPane tab="Tabs" key="tabs">
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(250px, 1fr))",
                          gap: "16px",
                        }}
                      >
                        <Form.Item
                          label="Ink Bar Color"
                          name={["components", "Tabs", "inkBarColor"]}
                        >
                          <ColorPicker showText />
                        </Form.Item>
                        <Form.Item
                          label="Selected Item Color"
                          name={["components", "Tabs", "itemSelectedColor"]}
                        >
                          <ColorPicker showText />
                        </Form.Item>
                        <Form.Item
                          label="Hover Item Color"
                          name={["components", "Tabs", "itemHoverColor"]}
                        >
                          <ColorPicker showText />
                        </Form.Item>
                      </div>
                    </TabPane>
                  </Tabs>
                </TabPane>
              </Tabs>
            </Form>
          </TabPane>

          <TabPane tab="Preview" key="2">
            <PreviewComponents />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}
