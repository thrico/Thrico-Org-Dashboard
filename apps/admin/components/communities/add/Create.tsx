import {
  Button,
  Card,
  Checkbox,
  Divider,
  Drawer,
  Flex,
  Form,
  Input,
  Radio,
  Segmented,
  Space,
  theme,
} from "antd";
import React, { useState } from "react";
// import Container from "../../Layout/Container";

// import {
//   createCommunities,
//   createGroup,
// } from "../../../graphql/actions/communities";
import { useRouter } from "next/navigation";

import Preview from "./Preview";
import { MdOutlineEventSeat } from "react-icons/md";
import { GiVideoConference } from "react-icons/gi";
import { RiLiveLine } from "react-icons/ri";
import {
  CloseCircleTwoTone,
  GlobalOutlined,
  LockOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Cover from "../Cover";
import TextArea from "antd/es/input/TextArea";
import { FormValues } from "../ts-types";
import { addCommunity } from "../../../graphql/actions/group";
const Create = ({}) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>(
    "https://cdn.thrico.network/communities-default-cover-photo.jpg"
  );
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const [cover, setCover] = useState<string>();
  const onCompleted = () => {
    onClose();
  };
  const [add, { loading }] = addCommunity({
    onCompleted,
  });
  const onFinish = (values: any) => {
    add({
      variables: {
        input: { cover: cover, ...values },
      },
    });
  };

  const [form] = Form.useForm<FormValues>();
  const data = Form.useWatch([], form);

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Create
      </Button>

      <Drawer
        closeIcon={<CloseCircleTwoTone style={{ fontSize: 20 }} />}
        height={"100vh"}
        placement="bottom"
        style={{ height: "100vh" }}
        title="Create Community"
        onClose={onClose}
        open={open}
        extra={
          <Button
            loading={loading}
            onClick={() => form.submit()}
            type="primary"
          >
            Create
          </Button>
        }
      >
        <Space align="start">
          <Form
            autoComplete="off"
            form={form}
            name="nest-messages"
            onFinish={onFinish}
            style={{ maxWidth: 700 }}
            layout="vertical"
            scrollToFirstError
            initialValues={{
              requireAdminApprovalForPosts: false,
              allowMemberInvites: false,
              enableEvents: false,
              enableRatingsAndReviews: false,
            }}
          >
            <Card>
              <>
                <Cover
                  setCover={setCover}
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                />

                <Form.Item
                  name={"title"}
                  label="Name"
                  rules={[{ required: true }]}
                >
                  <Input showCount maxLength={50} minLength={10} />
                </Form.Item>

                <Form.Item name={"description"} label="Description">
                  <TextArea showCount maxLength={300} />
                </Form.Item>
                <Divider />
                <Form.Item
                  name="privacy"
                  label="Choose Privacy"
                  hasFeedback
                  rules={[{ required: true }]}
                  style={{ width: "100%" }}
                  initialValue={"PUBLIC"}
                >
                  <Radio.Group>
                    <Radio value="PUBLIC" style={{ width: "100%", padding: 5 }}>
                      <Space>
                        <GlobalOutlined
                          style={{ color: "#10b981", fontSize: "20px" }}
                        />
                        <div>
                          <span style={{ fontWeight: 600 }}>Public</span>
                          <br />
                          <span style={{ color: "#888" }}>
                            Anyone can see and join this community
                          </span>
                        </div>
                      </Space>
                    </Radio>
                    <Radio
                      value="PRIVATE"
                      style={{ width: "100%", padding: 5 }}
                    >
                      <Space>
                        <LockOutlined
                          style={{ color: "#f59e0b", fontSize: "20px" }}
                        />
                        <div>
                          <span style={{ fontWeight: 600 }}>Private</span>
                          <br />
                          <span style={{ color: "#888" }}>
                            Only invited members can see and join
                          </span>
                        </div>
                      </Space>
                    </Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="communityType"
                  label="Community Type"
                  hasFeedback
                  rules={[{ required: true }]}
                  style={{ width: "100%" }}
                  initialValue={"VIRTUAL"}
                >
                  <Radio.Group style={{ width: "100%" }}>
                    <Radio
                      value="VIRTUAL"
                      style={{ width: "100%", padding: 5 }}
                    >
                      <Space>
                        <MdOutlineEventSeat
                          style={{ color: "#10b981", fontSize: "20px" }}
                        />
                        <div>
                          <span style={{ fontWeight: 600 }}>Virtual</span>
                          <br />
                          <span style={{ color: "#888" }}>
                            Online-only community
                          </span>
                        </div>
                      </Space>
                    </Radio>
                    <Radio
                      value="INPERSON"
                      style={{ width: "100%", padding: 5 }}
                    >
                      <Space>
                        <GiVideoConference
                          style={{ color: "#3b82f6", fontSize: "20px" }}
                        />
                        <div>
                          <span style={{ fontWeight: 600 }}>In Person</span>
                          <br />
                          <span style={{ color: "#888" }}>
                            Meets physically at a location
                          </span>
                        </div>
                      </Space>
                    </Radio>
                    <Radio value="HYBRID" style={{ width: "100%", padding: 5 }}>
                      <Space>
                        <RiLiveLine
                          style={{ color: "#f59e0b", fontSize: "20px" }}
                        />
                        <div>
                          <span style={{ fontWeight: 600 }}>Hybrid</span>
                          <br />
                          <span style={{ color: "#888" }}>
                            Both online and in-person
                          </span>
                        </div>
                      </Space>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  name="joiningTerms"
                  label="Community Joining Terms"
                  hasFeedback
                  rules={[{ required: true }]}
                  style={{ width: "100%" }}
                  initialValue={"ANYONE_CAN_JOIN"}
                >
                  <Radio.Group style={{ width: "100%" }}>
                    <Radio
                      value="ANYONE_CAN_JOIN"
                      style={{ width: "100%", padding: 5 }}
                    >
                      <Space>
                        <GlobalOutlined
                          style={{ color: "#10b981", fontSize: "20px" }}
                        />
                        <div>
                          <span style={{ fontWeight: 600 }}>
                            Anyone Can Join
                          </span>
                          <br />
                          <span style={{ color: "#888" }}>
                            Anyone can join this community directly
                          </span>
                        </div>
                      </Space>
                    </Radio>
                    <Radio
                      value="ADMIN_ONLY_ADD"
                      style={{ width: "100%", padding: 5 }}
                    >
                      <Space>
                        <LockOutlined
                          style={{ color: "#f59e0b", fontSize: "20px" }}
                        />
                        <div>
                          <span style={{ fontWeight: 600 }}>
                            Admin Only Add
                          </span>
                          <br />
                          <span style={{ color: "#888" }}>
                            Only admins can add members to this community
                          </span>
                        </div>
                      </Space>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <Divider />

                <h3>Additional Settings</h3>
                <Form.Item
                  name="requireAdminApprovalForPosts"
                  valuePropName="checked"
                >
                  <Checkbox>Require admin approval for new posts </Checkbox>
                </Form.Item>

                <Form.Item name="allowMemberInvites" valuePropName="checked">
                  <Checkbox>Allow members to invite others</Checkbox>
                </Form.Item>

                <Form.Item name="enableEvents" valuePropName="checked">
                  <Checkbox>Enable community events</Checkbox>
                </Form.Item>

                <Form.Item
                  name="enableRatingsAndReviews"
                  valuePropName="checked"
                >
                  <Checkbox>Enable community ratings and reviews</Checkbox>
                </Form.Item>
              </>
            </Card>
          </Form>

          <Preview imageUrl={imageUrl} data={data} />
        </Space>
      </Drawer>
    </>
  );
};

export default Create;
