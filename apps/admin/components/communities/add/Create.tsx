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
import { CommunityCreationForm } from "./community-creation-form";
const Create = ({}) => {
  const [form] = Form.useForm<FormValues>();
  const router = useRouter();

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
    form.resetFields();
  };
  const [add, { loading }] = addCommunity({
    onCompleted,
  });
  const onFinish = (values: any) => {
    add({
      variables: {
        input: { ...values, cover },
      },
    });
  };

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
          <Space>
            <Button
              loading={loading}
              onClick={() => form.submit()}
              type="primary"
            >
              Create
            </Button>
            <Button>Cancel</Button>
          </Space>
        }
      >
        <CommunityCreationForm
          initialValues={{
            requireAdminApprovalForPosts: false,
            allowMemberInvites: false,
            enableEvents: false,
            enableRatingsAndReviews: false,
          }}
          form={form}
          loading={loading}
          onFinish={onFinish}
          cover={cover}
          setCover={setCover}
        />
      </Drawer>
    </>
  );
};

export default Create;
