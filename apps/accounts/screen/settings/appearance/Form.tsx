import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import React from "react";
import {
  Button,
  Checkbox,
  Col,
  ColorPicker,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  Upload,
} from "antd";

const { Option } = Select;

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const AppearanceForm = ({
  colorPrimary,
  setColorPrimary,
  borderRadius,
  setBorderRadius,
  theme,
  containerColor,
  setContainerColor,
}) => {
  const onChangeBorderRadius = (newValue: number) => {
    setBorderRadius(newValue);
  };

  const onChangeColorPrimary = (newValue: number) => {
    setColorPrimary(newValue);
  };
  return (
    <Flex {...formItemLayout} vertical>
      <Form.Item style={{ width: "70%" }} name="Theme" label="Theme">
        <Space>
          {theme.map((set) => (
            <Image
              onClick={() => setColorPrimary(set.color)}
              style={{
                cursor: "pointer",
                margin: 5,

                border: set.color === colorPrimary ? "5px solid #1890FF" : "",
                borderRadius: 10,
              }}
              preview={false}
              width={100}
              height={70}
              src={set.img}
            />
          ))}
        </Space>
      </Form.Item>
      <Form.Item
        style={{ width: "70%" }}
        initialValue={0}
        name="Primary Color"
        label="Primary Color"
      >
        <Space style={{ width: "100%" }}>
          <ColorPicker
            style={{ borderRadius: borderRadius }}
            showText
            value={colorPrimary}
            onChange={setColorPrimary}
            onChangeComplete={(color) => {
              setColorPrimary(color.toHexString());
            }}
          />
        </Space>
      </Form.Item>
      <Form.Item
        style={{ width: "70%" }}
        initialValue={0}
        name="Container Color"
        label="Container Color"
      >
        <Space style={{ width: "100%" }}>
          <ColorPicker
            showText
            style={{ borderRadius: borderRadius }}
            value={containerColor}
            onChangeComplete={(color) => {
              setContainerColor(color.toHexString());
            }}
          />
        </Space>
      </Form.Item>
      <Form.Item
        style={{ width: "70%" }}
        initialValue={0}
        name="slider"
        label="Border Radius"
      >
        <Space style={{ width: "100%" }}>
          <InputNumber
            style={{ borderRadius: borderRadius }}
            addonAfter="px"
            min={1}
            value={borderRadius}
            onChange={onChangeBorderRadius}
            max={20}
          />

          <Slider
            value={borderRadius}
            onChange={onChangeBorderRadius}
            style={{ width: "10rem" }}
            min={1}
            max={20}
          />
        </Space>
      </Form.Item>
    </Flex>
  );
};

export default AppearanceForm;
