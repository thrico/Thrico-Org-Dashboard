import { Form, Input, Select } from "antd";
import React from "react";
import { data } from "./json/timeZone";
const { Option } = Select;
const TimeZone = () => {
  return (
    <Form.Item
      name="timeZone"
      label="Time Zone"
      style={{ width: "100%" }}
      rules={[{ required: true, message: "Please input your phone number!" }]}
      initialValue={"IST"}
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
