"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Form,
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
} from "antd";
import { CameraOutlined, InfoCircleOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
// import { CommunityPreview } from "./community-preview";

import { ImageCropper } from "../../communities/add/image-cropper";
import PhotoUpload from "./UploadImage";

const { TextArea } = Input;
const { Title, Text } = Typography;
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
export function ListingCreationForm({
  initialValues,
  loading,
  onFinish,
  form,
  cover,
  setCover,
}) {
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

  const handleCropComplete = (croppedImage: any, croppedUrl: string) => {
    setCover(croppedImage);
    setImageUrl(croppedUrl);
    setCropModalVisible(false);
    setSelectedImage(null);
    message.success("Cover image updated successfully!");
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    showUploadList: false,
    beforeUpload: handleImageUpload,
    accept: "image/*",
  };

  const formData = form?.getFieldsValue();

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{}}
          >
            <Card style={{ marginBottom: 24 }}>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                {/* Cover Image Section */}
                <PhotoUpload />

                {/* Name Field */}
                <Form.Item
                  name="title"
                  label={
                    <span>
                      Listing Title <span style={{ color: "#ff4d4f" }}>*</span>
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter the listing title",
                    },
                    { min: 3, message: "Title must be at least 3 characters" },
                    { max: 100, message: "Title cannot exceed 100 characters" },
                  ]}
                  extra="This will be the main title of your marketplace listing."
                >
                  <Input
                    placeholder="Enter listing title"
                    maxLength={100}
                    showCount
                  />
                </Form.Item>

                {/* Headline Field */}

                {/* Description Field */}
                <Form.Item
                  name="about"
                  label="Listing Description"
                  extra="Describe your listing in detail. Include features, condition, and any other relevant information to attract buyers."
                  rules={[
                    {
                      min: 10,
                      message: "Description should be at least 10 characters",
                    },
                    {
                      required: true,
                      message: "Please provide a description for your listing",
                    },
                  ]}
                >
                  <TextArea
                    placeholder="Describe your listing (features, condition, etc.)"
                    maxLength={300}
                    showCount
                    rows={4}
                  />
                </Form.Item>
              </Space>
            </Card>

            <Card style={{ marginBottom: 24 }}>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                {/* Privacy Settings */}
                <div>
                  <Title level={4} style={{ marginBottom: 16 }}>
                    Conditions <span style={{ color: "#ff4d4f" }}>*</span>
                  </Title>
                  <Form.Item
                    name="condition"
                    rules={[
                      {
                        required: true,
                        message: "Please select the condition",
                      },
                    ]}
                  >
                    <Radio.Group style={{ width: "100%" }}>
                      <Space
                        direction="vertical"
                        size="middle"
                        style={{ width: "100%" }}
                      >
                        <Radio value="NEW">
                          <div>
                            <div style={{ fontWeight: 500 }}>New</div>
                            <Text type="secondary" style={{ fontSize: 14 }}>
                              Brand new, unused, unopened, undamaged item
                            </Text>
                          </div>
                        </Radio>
                        <Radio value="USED-LIKE NEW">
                          <div>
                            <div style={{ fontWeight: 500 }}>
                              Used - Like New
                            </div>
                            <Text type="secondary" style={{ fontSize: 14 }}>
                              Looks and works like new, no visible wear
                            </Text>
                          </div>
                        </Radio>
                        <Radio value="USED-LIKE GOOD">
                          <div>
                            <div style={{ fontWeight: 500 }}>Used - Good</div>
                            <Text type="secondary" style={{ fontSize: 14 }}>
                              Minor signs of wear, fully functional
                            </Text>
                          </div>
                        </Radio>
                        <Radio value="USED-LIKE FAIR">
                          <div>
                            <div style={{ fontWeight: 500 }}>Used - Fair</div>
                            <Text type="secondary" style={{ fontSize: 14 }}>
                              Noticeable wear, but still works as intended
                            </Text>
                          </div>
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </div>

                <Divider />

                {/* Community Type */}
                <div>
                  <Title level={4} style={{ marginBottom: 16 }}>
                    Category <span style={{ color: "#ff4d4f" }}>*</span>
                  </Title>
                  <Form.Item
                    name="category"
                    rules={[
                      { required: true, message: "Please select a category" },
                    ]}
                  >
                    <Select
                      placeholder="Select a category"
                      style={{ width: "100%" }}
                    >
                      {categories.map((category) => (
                        <Select.Option key={category} value={category}>
                          {category}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                <div>
                  <Title level={4} style={{ marginBottom: 16 }}>
                    Price <span style={{ color: "#ff4d4f" }}>*</span>
                  </Title>
                  <Form.Item
                    name="price"
                    label={
                      <span>
                        Price (in rupees){" "}
                        <span style={{ color: "#ff4d4f" }}>*</span>
                      </span>
                    }
                    rules={[
                      { required: true, message: "Please enter the price" },
                      {
                        pattern: /^[0-9]+$/,
                        message: "Please enter a valid number",
                      },
                    ]}
                  >
                    <Input
                      prefix="₹"
                      placeholder="Enter price"
                      style={{ width: "100%" }}
                      type="number"
                      min={0}
                      max={1000000}
                    />
                  </Form.Item>
                </div>

                <Divider />
              </Space>
            </Card>

            {/* Bottom CTA moved to top header */}
          </Form>
        </Col>

        <Col xs={24} lg={8}>
          <div style={{ position: "sticky", top: 32 }}>
            <Title level={3} style={{ marginBottom: 16 }}>
              Preview
            </Title>
            {/* <CommunityPreview imageUrl={imageUrl} formData={formData} /> */}

            <Card style={{ marginTop: 24 }}>
              <Title level={4} style={{ marginBottom: 16 }}>
                <InfoCircleOutlined style={{ marginRight: 8 }} />
                Tips for Success
              </Title>
              <Space direction="vertical" size="small">
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: "#1890ff", fontWeight: "bold" }}>
                    •
                  </span>
                  <Text style={{ fontSize: 14 }}>
                    Choose a clear, descriptive name that reflects your
                    community's purpose
                  </Text>
                </div>
                <li>• Use a clear, descriptive title</li>
                <li>• Add high-quality photos from multiple angles</li>
                <li>• Include detailed condition information</li>
                <li>• Set a competitive price</li>
                <li>• Respond quickly to buyer inquiries</li>
              </Space>
            </Card>
          </div>
        </Col>
      </Row>

      {/* Image Cropper Modal */}

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
