

import { Form } from "antd";
import React from "react";

import PhoneInput from "antd-phone-input";

interface phone {
  initialValue: string;
}

const PhoneNumber = ({ initialValue }: phone) => {
  return (
    <Form.Item
      hasFeedback
      initialValue={initialValue}
      name="phone"
      label="Phone"
      style={{ width: "100%" }}
      rules={[{ required: true, message: "Please input your phone number!" }]}
    >
      <PhoneInput country={"in"} enableSearch />
    </Form.Item>
  );
};

export default React.memo(PhoneNumber);
