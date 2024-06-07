import {
  DeleteColumnOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Card, Flex, Form, Input, Space } from "antd";
import React from "react";

const Carousel = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };
  return (
    <Form
      name="dynamic_form_nest_item"
      style={{ width: "100%" }}
      autoComplete="off"
    >
      <Flex style={{ width: "100%", padding: 20 }} justify="center">
        <Card
          title="Update home Slider image"
          bordered={false}
          style={{ width: "100%" }}
          extra={[
            <Space>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Space>,
          ]}
        >
          <Flex style={{ width: "100%", gap: 20 }} justify="space-between">
            <Card style={{ width: "30%" }}>
              <Form.List name="users">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Card
                        extra={<DeleteOutlined onClick={() => remove(name)} />}
                        style={{ margin: 10 }}
                      >
                        <Space
                          key={key}
                          style={{
                            display: "flex",
                            marginBottom: 8,
                            position: "relative",
                          }}
                          align="baseline"
                          direction="vertical"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "first"]}
                            rules={[
                              { required: true, message: "Missing first name" },
                            ]}
                          >
                            <Input placeholder="First Name" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "last"]}
                            rules={[
                              { required: true, message: "Missing last name" },
                            ]}
                          >
                            <Input placeholder="Last Name" />
                          </Form.Item>
                        </Space>
                      </Card>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Card>

            <Card style={{ width: "70%" }}></Card>
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

export default Carousel;
