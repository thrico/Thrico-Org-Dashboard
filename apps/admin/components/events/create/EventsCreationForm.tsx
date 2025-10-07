"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import {
  Input,
  Button,
  Card,
  Radio,
  Upload,
  Typography,
  Row,
  Col,
  Divider,
  Space,
  message,
  Select,
  DatePicker,
  Tag,
  Form,
  TimePicker,
  Tooltip,
} from "antd";
import {
  CameraOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";

import GooglePlacesInput from "../../comman/location/Google-places-autocomplete";
import { ImageCropper } from "../../communities/add/image-cropper";
import { EventPreview } from "./EventPreview";

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;
const categories = [
  "Electronics & Appliances",
  "Vehicles",
  "Real Estate",
  "Home & Furniture",
  "Fashion & Beauty",
  "Sports, Hobbies & Books",
  "Pets",
  "Jobs",
  "Services",
  "Education & Classes",
  "Events",
  "Matrimonial",
  "Health & Fitness",
  "Travel & Tourism",
  "Community",
  "Tools & Equipment",
  "Baby & Kids",
  "Art & Antiques",
  "Industrial Goods",
  "Agriculture",
];
interface EventsCreationFormProps {
  initialValues?: Record<string, any>;
  loading?: boolean;
  onFinish: (values: any) => void;
  form: any;
  cover: any;
  setCover: (cover: any) => void;
  showPreview?: boolean;
}

export function EventsCreationForm({
  initialValues,
  loading,
  onFinish,
  form,
  cover,
  setCover,
  showPreview = true,
}: EventsCreationFormProps) {
  const formData = form?.getFieldsValue();
  const values = Form.useWatch([], form);
  const { TextArea } = Input;
  const { Option } = Select;

  const { RangePicker } = DatePicker;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
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
  const handleCropComplete = (croppedImage: any, croppedUrl: string) => {
    setCover(croppedImage);
    setImageUrl(croppedUrl);
    setCropModalVisible(false);
    setSelectedImage(null);
    message.success("Cover image updated successfully!");
  };
  return (
    <>
      <Row gutter={16}>
        <Col span={showPreview ? 15 : 24}>
          <Card style={{ marginBottom: 24 }}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {/* Cover Image Section */}
              <div>
                <div style={{ position: "relative", marginBottom: 0 }}>
                  <div
                    style={{
                      overflow: "hidden",
                      borderRadius: 8,
                      backgroundColor: "#f5f5f5",
                      border: "2px dashed #d9d9d9",
                      width: "100%",
                      height: 200,
                    }}
                  >
                    <Image
                      src={
                        imageUrl ||
                        "https://cdn.thrico.network/defaultEventCover.png"
                      }
                      alt="Community cover"
                      fill
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
          <Form
            onFinish={onFinish}
            form={form}
            layout="vertical"
            initialValues={{
              title: "",
              location: { name: "" },
              description: "",
              startDate: "",
              endDate: "",
              startTime: "",
              type: "IN_PERSON",
              lastDateOfRegistration: "",
              ...initialValues,
            }}
          >
            <Card style={{ marginBottom: 24 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="title"
                    label="Event Title"
                    rules={[
                      { required: true, message: "Please enter event title" },
                    ]}
                  >
                    <Input placeholder="Enter event title" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="location"
                    label="Location"
                    rules={[
                      { required: true, message: "Please enter location" },
                    ]}
                  >
                    <GooglePlacesInput
                      onChange={(value) =>
                        form.setFieldsValue({ location: value })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="description"
                label="Event Description"
                rules={[
                  { required: true, message: "Please enter event description" },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Describe the event, what attendees can expect, and what makes it exciting..."
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="startDate"
                    label="Start Date"
                    rules={[
                      { required: true, message: "Please select start date" },
                    ]}
                  >
                    <DatePicker
                      format="DD MMMM YYYY"
                      placeholder="Start date"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="endDate"
                    label="End Date"
                    rules={[
                      { required: true, message: "Please select end date" },
                    ]}
                  >
                    <DatePicker format="DD MMMM YYYY" placeholder="End date" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="startTime"
                    label="Start Time"
                    rules={[
                      { required: true, message: "Please select start time" },
                    ]}
                  >
                    <TimePicker format="HH:mm" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="type"
                    label="Event Type"
                    rules={[
                      { required: true, message: "Please select event type" },
                    ]}
                  >
                    <Select placeholder="Select event type">
                      <Option value="IN_PERSON">In Person</Option>
                      <Option value="ONLINE">Online</Option>
                      <Option value="HYBRID">Hybrid</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastDateOfRegistration"
                    label="Registration Deadline"
                    rules={[
                      {
                        required: true,
                        message: "Please select registration deadline",
                      },
                    ]}
                  >
                    <DatePicker
                      format="DD MMMM YYYY"
                      placeholder="Registration deadline"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Form>
        </Col>
        {showPreview && (
          <Col span={9}>
            <div style={{ position: "sticky", top: 24 }}>
              <div style={{ marginBottom: 16 }}>
                <Text strong style={{ fontSize: 16 }}>
                  Event Preview
                </Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  See how your event will appear to attendees
                </Text>
              </div>
              <EventPreview
                eventData={values || {}}
                coverImage={imageUrl || undefined}
              />
            </div>
          </Col>
        )}
      </Row>

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

      {/* Image Cropper Modal */}
    </>
  );
}
