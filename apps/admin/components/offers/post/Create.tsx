"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Switch,
  Typography,
  Space,
  Drawer,
  Row,
  Col,
  DatePicker,
  message,
  Upload,
} from "antd";

import GooglePlacesInput from "../../comman/location/Google-places-autocomplete";
import { CompanyAutocompleteSelect } from "../../jobs/create/CommanyAutoComplete";
import { useAddOffer, useEditOffer } from "../../../graphql/actions/offers";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import { UploadProps } from "antd/lib";
import { ImageCropper } from "../../communities/add/image-cropper";
import { CameraOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function CreateOffer({
  type,
  initialValues,
  onClose,
  open,
}: {
  type?: "create" | "edit";
  initialValues?: any;
  onClose: () => void;
  open: boolean;
}) {
  const router = useRouter();
  const [form] = Form.useForm();

  const onCompleted = () => {
    onClose();
    form.resetFields();
  };
  const [add, { loading: loadBtn }] = useAddOffer({
    onCompleted,
  });

  const [edit, { loading: editBtn }] = useEditOffer({
    onCompleted,
  });

  const onFinish = (values: any) => {
    if (type === "create") {
      add({
        variables: {
          input: {
            ...values,
            cover: cover,
          },
        },
      });
    } else {
      edit({
        variables: {
          input: {
            id: initialValues.id,
            ...values,
            cover: cover,
          },
        },
      });
    }
  };
  const { RangePicker } = DatePicker;
  const [imageUrl, setImageUrl] = useState<string | null>(
    `https://cdn.thrico.network/${initialValues?.cover}` || null
  );
  const [cropModalVisible, setCropModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setCropModalVisible(true);
    };
    reader.readAsDataURL(file);
    return false; // Prevent auto upload
  };
  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    showUploadList: false,
    beforeUpload: handleImageUpload,
    accept: "image/*",
  };
  const [cover, setCover] = useState<string>();
  const handleCropComplete = (croppedImage: any, croppedUrl: string) => {
    setCover(croppedImage);
    setImageUrl(croppedUrl);
    setCropModalVisible(false);
    setSelectedImage(null);
    message.success("Cover image updated successfully!");
  };
  return (
    <>
      <Drawer
        title="Offer Details"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        width={800}
        extra={
          <Space>
            <Button onClick={() => router.back()}>Cancel</Button>
            <Button
              loading={loadBtn || editBtn}
              onClick={() => form.submit()}
              type="primary"
            >
              {type === "create" ? "Create Offer" : "Update Offer"}
            </Button>
          </Space>
        }
      >
        <Card style={{ marginBottom: 24 }}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {/* Cover Image Section */}
            <div>
              <div style={{ position: "relative", marginBottom: 0 }}>
                <div
                  style={{
                    aspectRatio: "3/1",
                    overflow: "hidden",
                    borderRadius: 8,
                    backgroundColor: "#f5f5f5",
                    border: "2px dashed #d9d9d9",
                  }}
                >
                  <Image
                    src={
                      imageUrl ||
                      "https://cdn.thrico.network/defaultEventCover.png"
                    }
                    alt="Community cover"
                    width={650}
                    height={200}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <Upload {...uploadProps}>
                  <Button
                    icon={<CameraOutlined />}
                    style={{
                      position: "absolute",
                      bottom: 27,
                      right: 16,
                    }}
                  >
                    Update Cover
                  </Button>
                </Upload>
              </div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Recommended size: 1200 x 400px. Max file size: 5MB. Click to
                crop after upload.
              </Text>
            </div>
          </Space>
        </Card>
        <Card>
          <Title level={3}></Title>
          <Text type="secondary" style={{ marginBottom: 24, display: "block" }}>
            Basic information about your offer
          </Text>

          <Form
            initialValues={{
              title: initialValues?.title || "",
              description: initialValues?.description || "",
              location: initialValues?.location || "",
              company: initialValues?.company || "",
              website: initialValues?.website || "",
              termsAndConditions: initialValues?.termsAndConditions || "",
              timeline: initialValues?.timeline
                ? [
                    initialValues.timeline[0]
                      ? dayjs(initialValues.timeline[0])
                      : null,
                    initialValues.timeline[1]
                      ? dayjs(initialValues.timeline[1])
                      : null,
                  ]
                : undefined,
            }}
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="title"
                  label="Offer Title"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a title for your  offer",
                    },
                  ]}
                >
                  <Input placeholder="Give your Offer a title" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="timeline"
                  label="Offer Start and End Date"
                  rules={[
                    {
                      required: true,
                      message: "Please select the offer start and end date",
                    },
                  ]}
                >
                  <RangePicker format={"MMMM D, YYYY"} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Describe what this offer includes",
                },
              ]}
            >
              <TextArea
                maxLength={500}
                showCount
                rows={8}
                placeholder="What would you like to discuss?"
              />
            </Form.Item>
            {type === "create" && (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="location"
                    label={"Location"}
                    rules={[
                      {
                        required: true,
                        message: "Please select a location",
                      },
                    ]}
                    extra="Select the Job Location"
                  >
                    <GooglePlacesInput
                      onChange={(value) =>
                        form.setFieldsValue({ location: value })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="company"
                    label="Company"
                    rules={[
                      { required: true, message: "Please enter company name" },
                    ]}
                  >
                    <CompanyAutocompleteSelect
                      onChange={(value) =>
                        form.setFieldsValue({ school: value })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            )}

            <Form.Item
              name="website"
              label="Website"
              rules={[
                {
                  required: true,
                  message: "Please enter a website URL",
                },
              ]}
            >
              <Input placeholder="Please enter a website URL" />
            </Form.Item>

            <Form.Item
              name="termsAndConditions"
              label="Terms and conditions"
              rules={[
                {
                  required: true,
                  message: "Describe what this offer includes",
                },
              ]}
            >
              <TextArea
                maxLength={500}
                showCount
                rows={8}
                placeholder="Enter any terms and conditions for this offer"
              />
            </Form.Item>
          </Form>
        </Card>
      </Drawer>

      {selectedImage && (
        <ImageCropper
          cropModalVisible={cropModalVisible}
          image={selectedImage}
          onCropComplete={handleCropComplete}
          onCancel={() => {
            setCropModalVisible(false);
            setSelectedImage(null);
          }}
        />
      )}
    </>
  );
}
