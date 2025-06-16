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

import { CloseCircleTwoTone } from "@ant-design/icons";

import { addCommunity } from "../../../graphql/actions/group";
import { FormValues } from "../../communities/ts-types";
import { ListingCreationForm } from "./ListingCreationForm";

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
        title="Create Listing"
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
        <ListingCreationForm
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
