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

import { useAddEvent } from "../../../graphql/actions/events";
import { EventsCreationForm } from "./EventsCreationForm";

const Create = ({}) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const [add, { loading }] = useAddEvent({
    onCompleted: (data) => {
      onClose();
      window.location.reload();
    },
  });

  const [open, setOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const [cover, setCover] = useState<string>();
  const onCompleted = () => {
    // onClose();
    // form.resetFields();
  };

  const onFinish = (values: any) => {
    // Transform form values to match the event input structure
    const eventInput = {
      title: values.title,
      location: values.location,
      description: values.description,
      startDate: values.startDate?.toISOString(),
      endDate: values.endDate?.toISOString(),
      startTime: values.startTime?.format("HH:mm"),
      type: values.type,
      lastDateOfRegistration: values.lastDateOfRegistration?.toISOString(),
      coverImage: cover,
      // You can replace this with actual entity logic
    };

    console.log("Creating event with data:", eventInput);

    add({
      variables: {
        input: eventInput,
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
        title="Create Event"
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={() => setShowPreview(!showPreview)} type="default">
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
            <Button
              onClick={() => form.submit()}
              type="primary"
              loading={loading}
            >
              Create Event
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <EventsCreationForm
          initialValues={{}}
          form={form}
          loading={loading}
          onFinish={onFinish}
          cover={cover}
          setCover={setCover}
          showPreview={showPreview}
        />
      </Drawer>
    </>
  );
};

export default Create;
