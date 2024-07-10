import {
  DeleteColumnOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { from } from "@apollo/client";
import { Button, Card, Flex, Form, Input, Space, Upload } from "antd";
import React from "react";
import ImgCrop from "antd-img-crop";
import Preview from "./Preview";
import {
  getHomePageCarousel,
  updateHomePageCarousel,
} from "../../graphql/actions";
const Carousel = () => {
  const [form] = Form.useForm();
  const carousel = Form.useWatch("carousel", form);
  const [update, { loading }] = updateHomePageCarousel({});
  const onFinish = (values: any) => {
    const data = values.carousel.map((set) => ({
      link: set.link,
      url: set.url[0].originFileObj,
    }));
    update({
      variables: {
        input: data,
      },
    });
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const { data } = getHomePageCarousel();

  return (
    <Form
      name="dynamic_form_nest_item"
      style={{ width: "100%" }}
      autoComplete="off"
      onFinish={onFinish}
      form={form}
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
              <Form.List name="carousel">
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
                            rules={[
                              { required: true, message: "Missing last name" },
                            ]}
                            {...restField}
                            name={[name, "url"]}
                            label="Upload"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                          >
                            <Upload
                              name="logo"
                              listType="picture"
                              showUploadList={false}
                            >
                              <Button icon={<UploadOutlined />}></Button>
                            </Upload>
                          </Form.Item>
                          <Form.Item name={[name, "link"]}>
                            <Input placeholder="Url" />
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
                        Add Item
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Card>

            <Card
              style={{
                width: "70%",
                position: "sticky",
                top: 0,
                height: "80vh",
              }}
            >
              <Preview list={carousel} />
            </Card>
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

export default Carousel;
