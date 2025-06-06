"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Form,
  Input,
  Button,
  Card,
  Radio,
  Switch,
  Upload,
  Typography,
  Row,
  Col,
  Divider,
  Tooltip,
  Space,
  Modal,
  message,
} from "antd";
import {
  CameraOutlined,
  InfoCircleOutlined,
  GlobalOutlined,
  LockOutlined,
  LaptopOutlined,
  EnvironmentOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";
import { CommunityPreview } from "./community-preview";
import { ImageCropper } from "./image-cropper";
import LocationAutocomplete from "../../../screen/comman/LocationAutocomplete";

const { TextArea } = Input;
const { Title, Text } = Typography;

export function CommunityCreationForm({
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
                        width={600}
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

                {/* Name Field */}
                <Form.Item
                  name="title"
                  label={
                    <span>
                      Name <span style={{ color: "#ff4d4f" }}>*</span>
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter community name" },
                    { min: 3, message: "Name must be at least 3 characters" },
                    { max: 50, message: "Name cannot exceed 50 characters" },
                  ]}
                  extra="This will be the main name of your community."
                >
                  <Input
                    placeholder="Enter community name"
                    maxLength={50}
                    showCount
                  />
                </Form.Item>

                {/* Headline Field */}
                <Form.Item
                  name="tagline"
                  label={
                    <Space>
                      <span>Tagline</span>
                      <Tooltip title="A short, catchy headline that appears below your community name.">
                        <InfoCircleOutlined style={{ color: "#8c8c8c" }} />
                      </Tooltip>
                    </Space>
                  }
                  extra="A brief tagline that describes your community's purpose."
                >
                  <Input
                    placeholder="Enter a catchy headline for your community"
                    maxLength={100}
                    showCount
                  />
                </Form.Item>

                {/* Description Field */}
                <Form.Item
                  name="description"
                  label="Description"
                  extra="Tell potential members what your community is about and why they should join."
                  rules={[
                    {
                      min: 10,
                      message: "Description should be at least 10 characters",
                    },
                  ]}
                >
                  <TextArea
                    placeholder="Describe what your community is about"
                    maxLength={300}
                    showCount
                    rows={4}
                  />
                </Form.Item>
                {/* <Form.Item
                  name="location"
                  label={
                    <Space>
                      <span>Location</span>
                      <Tooltip title="Choose a location for your community">
                        <InfoCircleOutlined style={{ color: "#8c8c8c" }} />
                      </Tooltip>
                    </Space>
                  }
                  extra="This helps others understand where your community is based."
                >
                  <LocationAutocomplete form={form} />
                </Form.Item> */}
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
                    Privacy Settings <span style={{ color: "#ff4d4f" }}>*</span>
                  </Title>
                  <Form.Item name="privacy" rules={[{ required: true }]}>
                    <Radio.Group style={{ width: "100%" }}>
                      <Space
                        direction="vertical"
                        size="middle"
                        style={{ width: "100%" }}
                      >
                        <Radio value="PUBLIC">
                          <Space>
                            <GlobalOutlined />
                            <div>
                              <div style={{ fontWeight: 500 }}>Public</div>
                              <Text type="secondary" style={{ fontSize: 14 }}>
                                Anyone can see and join this community
                              </Text>
                            </div>
                          </Space>
                        </Radio>
                        <Radio value="PRIVATE">
                          <Space>
                            <LockOutlined />
                            <div>
                              <div style={{ fontWeight: 500 }}>Private</div>
                              <Text type="secondary" style={{ fontSize: 14 }}>
                                Only invited members can see and join
                              </Text>
                            </div>
                          </Space>
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </div>

                <Divider />

                {/* Community Type */}
                <div>
                  <Title level={4} style={{ marginBottom: 16 }}>
                    Community Type <span style={{ color: "#ff4d4f" }}>*</span>
                  </Title>
                  <Form.Item name="communityType" rules={[{ required: true }]}>
                    <Radio.Group style={{ width: "100%" }}>
                      <Space
                        direction="vertical"
                        size="middle"
                        style={{ width: "100%" }}
                      >
                        <Radio value="VIRTUAL">
                          <Space>
                            <LaptopOutlined />
                            <div>
                              <div style={{ fontWeight: 500 }}>Virtual</div>
                              <Text type="secondary" style={{ fontSize: 14 }}>
                                Online-only community
                              </Text>
                            </div>
                          </Space>
                        </Radio>
                        <Radio value="INPERSON">
                          <Space>
                            <EnvironmentOutlined />
                            <div>
                              <div style={{ fontWeight: 500 }}>In Person</div>
                              <Text type="secondary" style={{ fontSize: 14 }}>
                                Meets physically at a location
                              </Text>
                            </div>
                          </Space>
                        </Radio>
                        <Radio value="HYBRID">
                          <Space>
                            <SyncOutlined />
                            <div>
                              <div style={{ fontWeight: 500 }}>Hybrid</div>
                              <Text type="secondary" style={{ fontSize: 14 }}>
                                Both online and in-person
                              </Text>
                            </div>
                          </Space>
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </div>

                <Divider />

                {/* Joining Terms */}
                <div>
                  <Title level={4} style={{ marginBottom: 16 }}>
                    Joining Terms <span style={{ color: "#ff4d4f" }}>*</span>
                  </Title>
                  <Form.Item name="joiningTerms" rules={[{ required: true }]}>
                    <Radio.Group style={{ width: "100%" }}>
                      <Space
                        direction="vertical"
                        size="middle"
                        style={{ width: "100%" }}
                      >
                        <Radio value="ANYONE_CAN_JOIN">
                          <div>
                            <div style={{ fontWeight: 500 }}>
                              Anyone Can Join
                            </div>
                            <Text type="secondary" style={{ fontSize: 14 }}>
                              Anyone can join this community directly
                            </Text>
                          </div>
                        </Radio>
                        <Radio value="ADMIN_ONLY_ADD">
                          <div>
                            <div style={{ fontWeight: 500 }}>
                              Admin Only Add
                            </div>
                            <Text type="secondary" style={{ fontSize: 14 }}>
                              Only admins can add members to this community
                            </Text>
                          </div>
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </Space>
            </Card>

            <Card style={{ marginBottom: 24 }}>
              <Title level={4} style={{ marginBottom: 16 }}>
                Additional Settings
              </Title>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <Row justify="space-between" align="middle">
                  <Col span={18}>
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: 4 }}>
                        Require admin approval for new posts
                      </div>
                      <Text type="secondary" style={{ fontSize: 14 }}>
                        All posts will need to be approved by an admin before
                        being published
                      </Text>
                    </div>
                  </Col>
                  <Col>
                    <Form.Item
                      name="requireAdminApprovalForPosts"
                      style={{ margin: 0 }}
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>

                <Divider style={{ margin: "12px 0" }} />

                <Row justify="space-between" align="middle">
                  <Col span={18}>
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: 4 }}>
                        Allow members to invite others
                      </div>
                      <Text type="secondary" style={{ fontSize: 14 }}>
                        Members can invite friends to join the community
                      </Text>
                    </div>
                  </Col>
                  <Col>
                    <Form.Item
                      name="allowMemberInvites"
                      valuePropName="checked"
                      style={{ margin: 0 }}
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>

                <Divider style={{ margin: "12px 0" }} />

                <Row justify="space-between" align="middle">
                  <Col span={18}>
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: 4 }}>
                        Enable community events
                      </div>
                      <Text type="secondary" style={{ fontSize: 14 }}>
                        Allow creating and managing events within the community
                      </Text>
                    </div>
                  </Col>
                  <Col>
                    <Form.Item
                      name="enableEvents"
                      valuePropName="checked"
                      style={{ margin: 0 }}
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>

                <Divider style={{ margin: "12px 0" }} />

                <Row justify="space-between" align="middle">
                  <Col span={18}>
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: 4 }}>
                        Enable community ratings and reviews
                      </div>
                      <Text type="secondary" style={{ fontSize: 14 }}>
                        Allow members to rate and review community content
                      </Text>
                    </div>
                  </Col>
                  <Col>
                    <Form.Item
                      name="enableRatingsAndReviews"
                      valuePropName="checked"
                      style={{ margin: 0 }}
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>
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
            <CommunityPreview imageUrl={imageUrl} formData={formData} />

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
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: "#1890ff", fontWeight: "bold" }}>
                    •
                  </span>
                  <Text style={{ fontSize: 14 }}>
                    Add a compelling headline that captures interest
                  </Text>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: "#1890ff", fontWeight: "bold" }}>
                    •
                  </span>
                  <Text style={{ fontSize: 14 }}>
                    Upload a high-quality cover image that represents your
                    community
                  </Text>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: "#1890ff", fontWeight: "bold" }}>
                    •
                  </span>
                  <Text style={{ fontSize: 14 }}>
                    Write a detailed description explaining the benefits of
                    joining
                  </Text>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: "#1890ff", fontWeight: "bold" }}>
                    •
                  </span>
                  <Text style={{ fontSize: 14 }}>
                    Consider your privacy settings carefully based on your
                    community goals
                  </Text>
                </div>
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
