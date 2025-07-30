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
// import { CommunityPreview } from "./community-preview";

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
interface ListingCreationFormProps {
  initialValues?: Record<string, any>;
  loading?: boolean;
  onFinish: (values: any) => void;
  form: any;
  cover: any;
  setCover: (cover: any) => void;
}

export function EventsCreationForm({
  initialValues,
  loading,
  onFinish,
  form,
  cover,
  setCover,
}: ListingCreationFormProps) {
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
      <Row gutter={24}>
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
        <Col span={14}>
          <Form
            onFinish={onFinish}
            form={form}
            layout="vertical"
            initialValues={{
              requirements: [""],
              responsibilities: [""],
              benefits: [""],
              skills: [""],
              ...initialValues,
            }}
          >
            <Card style={{ marginBottom: 24 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                      { required: true, message: "Please enter job title" },
                    ]}
                  >
                    <Input placeholder="Enter event title" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="location"
                    label="location"
                    rules={[
                      { required: true, message: "Please enter Location" },
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
                label="Description"
                rules={[{ required: true, message: "Please enter  title" }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Describe the role, company culture, and what makes this opportunity exciting..."
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="date"
                    label="Event Date"
                    rules={[
                      { required: true, message: "Please add Description" },
                    ]}
                    getValueProps={(value) => ({
                      value: value,
                      // This ensures the value is a dayjs object if needed
                    })}
                  >
                    <RangePicker
                      showTime
                      format="DD MMMM YYYY"
                      placeholder={["Start date", "End date"]}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="startTime"
                    label="Start Time"
                    rules={[
                      { required: true, message: "Please select Start Time" },
                    ]}
                  >
                    <TimePicker />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="Type"
                    label="Event Type"
                    rules={[
                      { required: true, message: "Please select Event Type" },
                    ]}
                  >
                    <Select placeholder="Select event type">
                      <Option value="PHYSICAL">Physical</Option>
                      <Option value="HYBRID">Hybrid</Option>
                      <Option value="ONLINE">Online</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastDateOfRegistration"
                    label="Last Date Of Registration"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <DatePicker />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Form>
        </Col>
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
