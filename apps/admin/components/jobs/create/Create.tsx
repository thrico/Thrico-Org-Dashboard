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

import { useAddListing } from "../../../graphql/actions/listing";
import { JobCreationForm } from "./JobCreationForm";
import { useAddJob } from "../../../graphql/actions/jobs";

const Create = ({}) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const [add, { loading }] = useAddJob({
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
    add({
      variables: {
        input: values,
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
        title="Create Job"
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
        <JobCreationForm
          initialValues={{}}
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
