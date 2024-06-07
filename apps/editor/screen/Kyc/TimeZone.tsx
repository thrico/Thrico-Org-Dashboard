import { Form, Input, Select } from "antd";
import React from "react";
import { data } from "./json/timeZone";
const { Option } = Select;
const TimeZone = ({ initialValue }) => {
  return (
    <Form.Item
      hasFeedback
      initialValue={initialValue}
      name="timeZone"
      label="Time Zone"
      style={{ width: "100%" }}
      rules={[{ required: true, message: "Please input your phone number!" }]}
    >
      <Select>
        {data.map((set, key) => (
          <Option key={key} value={set.abbr}>
            {set.text}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default React.memo(TimeZone);
