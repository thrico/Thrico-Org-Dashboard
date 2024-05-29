import { Form, Input, Select } from "antd";
import React from "react";
import { data } from "./json/language";
const { Option } = Select;
const Language = ({ initialValue }) => {
  const prefixSelector = (
    <Form.Item initialValue={"+91"} name="prefix" noStyle></Form.Item>
  );

  return (
    <Form.Item
      hasFeedback
      name="language"
      label="Language"
      initialValue={initialValue}
      rules={[{ required: true, message: "Please input your phone number!" }]}
    >
      <Select>
        {data.map((set, key) => (
          <Option key={key} value={set.code}>
            {set.name}({set.nativeName})
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default React.memo(Language);
