import {
  Button,
  Card,
  Checkbox,
  Divider,
  Drawer,
  Flex,
  Form,
  Input,
  message,
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

import { ListingCreationForm } from "./ListingCreationForm";
import { PhotoUploadFile } from "../ts-types";
import { useAddListing } from "../../../graphql/actions/listing";

const Create = ({}) => {
  const [fileList, setFileList] = useState<PhotoUploadFile[]>([]);
  const [form] = Form.useForm();
  const router = useRouter();

  const [add, { loading }] = useAddListing({
    onCompleted: (data) => {
      onClose();
    },
  });

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

  const onFinish = (values: any) => {
    if (fileList.length === 0) {
      message.error("Please upload at least one image.");
      return;
    }
    const data = {
      ...values,
      media: fileList.map((file) => file.originFileObj),
      lat,
      lng,
    };

    add({
      variables: {
        input: data,
      },
    });
  };

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
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
              onClick={() => form.submit()}
              type="primary"
              loading={loading}
            >
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <ListingCreationForm
          setLat={setLat}
          setLng={setLng}
          fileList={fileList}
          setFileList={setFileList}
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
