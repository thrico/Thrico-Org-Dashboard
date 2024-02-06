import { Form, Input, Select } from "antd";
import React from "react";
import { data } from "./json/phoneJosn";
const { Option } = Select;
const PhoneNumber = () => {
  const prefixSelector = (
    <Form.Item initialValue={"+91"} name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        {data.map((set, key) => (
          <Option key={key} value={set.dial_code}>
            {set.dial_code}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  return (
    <Form.Item
      name="phone"
      label="Phone Number"
      rules={[{ required: true, message: "Please input your phone number!" }]}
    >
      <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
    </Form.Item>
  );
};

export default React.memo(PhoneNumber);
