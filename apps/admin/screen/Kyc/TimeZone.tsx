import { Form, Input, Select } from "antd";
import React from "react";
import { data } from "./json/timeZone";
const { Option } = Select;

const country = [
  {
    label: "India",
    value: "IND",
  },
  {
    label: "USA",
    value: "US",
  },
  {
    label: "UAE",
    value: "UAE",
  },
];
const TimeZone = ({ initialValue }) => {
  return (
    <Form.Item
      hasFeedback
      initialValue={initialValue}
      name="country"
      label="Country"
      style={{ width: "100%" }}
      rules={[{ required: true, message: "Please input your phone number!" }]}
    >
      <Select>
        {country.map((set, key) => (
          <Option key={key} value={set.value}>
            {set.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default React.memo(TimeZone);
