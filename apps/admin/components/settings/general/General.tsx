"use client";
import {
  Typography,
  Card,
  Divider,
  Select,
  Button,
  Input,
  Upload,
  Modal,
  Avatar,
} from "antd";
import {
  ShopOutlined,
  EnvironmentOutlined,
  EditOutlined,
  EllipsisOutlined,
  UploadOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import {
  uploadEntityLogo,
  updateEntityProfile,
  getEntity,
} from "../../../graphql/actions";
import { message } from "antd";

const { Title, Text, Link } = Typography;

export default function General() {
  // GraphQL hooks
  const { data: entityData, loading: entityLoading } = getEntity();

  const [uploadLogo, { loading: uploadingLogo }] = uploadEntityLogo({
    onCompleted: (data: any) => {
      if (data.uploadEntityLogo.success) {
        message.success(
          data.uploadEntityLogo.message || "Logo uploaded successfully!"
        );
        setCommunityImage(data.uploadEntityLogo.logo);
      } else {
        message.error(data.uploadEntityLogo.message || "Failed to upload logo");
      }
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to upload logo");
    },
  });

  const [updateProfile, { loading: updatingProfile }] = updateEntityProfile({
    onCompleted: (data: any) => {
      if (data.updateEntityProfile.success) {
        message.success(
          data.updateEntityProfile.message || "Profile updated successfully!"
        );
        setCommunityName(data.updateEntityProfile.name);
      } else {
        message.error(
          data.updateEntityProfile.message || "Failed to update profile"
        );
      }
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to update profile");
    },
  });

  const [isEditingName, setIsEditingName] = useState(false);
  const [communityName, setCommunityName] = useState(
    entityData?.getEntity?.name || "My Page"
  );
  const [tempName, setTempName] = useState(communityName);
  const [communityImage, setCommunityImage] = useState<string | null>(
    entityData?.getEntity?.logo || null
  );
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isCropModalVisible, setIsCropModalVisible] = useState(false);
  const [imageToProcess, setImageToProcess] = useState<string | null>(null);
  const [originalImageSize, setOriginalImageSize] = useState({
    width: 0,
    height: 0,
  });
  const [cropArea, setCropArea] = useState({
    x: 0,
    y: 0,
    width: 200,
    height: 200,
  });
  const [isDragging, setIsDragging] = useState(false);

  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [displayImageSize, setDisplayImageSize] = useState({
    width: 0,
    height: 0,
  });
  const imageRef = useRef<HTMLImageElement>(null);
  const cropContainerRef = useRef<HTMLDivElement>(null);

  // Update state when entity data loads
  useEffect(() => {
    if (entityData?.getEntity) {
      setCommunityName(entityData.getEntity.name || "My Page");
      setTempName(entityData.getEntity.name || "My Page");
      setCommunityImage(
        `https://cdn.thrico.network/${entityData.getEntity.logo}` || null
      );
    }
  }, [entityData]);

  const handleNameEdit = () => {
    setTempName(communityName);
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    if (tempName.trim() && tempName !== communityName) {
      updateProfile({
        variables: {
          input: {
            name: tempName.trim(),
          },
        },
      });
    }
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setTempName(communityName);
    setIsEditingName(false);
  };

  const handleImageUpload = (info: any) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setOriginalImageSize({ width: img.width, height: img.height });
          // Set initial crop area to center square
          const size = Math.min(img.width, img.height) * 0.8;
          setCropArea({
            x: (img.width - size) / 2,
            y: (img.height - size) / 2,
            width: size,
            height: size,
          });
        };
        img.src = e.target?.result as string;
        setImageToProcess(e.target?.result as string);
        setIsImageModalVisible(false);
        setIsCropModalVisible(true);
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const cropImageManually = (imageSrc: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        // Make sure crop area is square
        const size = Math.min(cropArea.width, cropArea.height);
        canvas.width = size;
        canvas.height = size;

        // Draw the cropped image based on user selection
        ctx.drawImage(
          img,
          cropArea.x,
          cropArea.y,
          size,
          size, // Source rectangle (user selected area)
          0,
          0,
          size,
          size // Destination rectangle (square canvas)
        );

        resolve(canvas.toDataURL("image/jpeg", 0.9));
      };
      img.src = imageSrc;
    });
  };

  const getMousePosition = (e: React.MouseEvent | MouseEvent) => {
    if (!imageRef.current) return { x: 0, y: 0 };

    const imageRect = imageRef.current.getBoundingClientRect();
    const scaleX = originalImageSize.width / imageRect.width;
    const scaleY = originalImageSize.height / imageRect.height;

    return {
      x: Math.max(
        0,
        Math.min((e.clientX - imageRect.left) * scaleX, originalImageSize.width)
      ),
      y: Math.max(
        0,
        Math.min((e.clientY - imageRect.top) * scaleY, originalImageSize.height)
      ),
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const pos = getMousePosition(e);
    setDragStart(pos);
    setIsDragging(true);

    // Add global mouse event listeners
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const currentPos = getMousePosition(e as any);
      const width = Math.abs(currentPos.x - dragStart.x);
      const height = Math.abs(currentPos.y - dragStart.y);
      const size = Math.max(20, Math.min(width, height)); // Minimum size of 20px

      const x = Math.min(dragStart.x, currentPos.x);
      const y = Math.min(dragStart.y, currentPos.y);

      // Ensure crop area doesn't go outside image bounds
      const maxX = Math.max(0, Math.min(x, originalImageSize.width - size));
      const maxY = Math.max(0, Math.min(y, originalImageSize.height - size));

      setCropArea({
        x: maxX,
        y: maxY,
        width: size,
        height: size,
      });
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };

    document.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseup", handleGlobalMouseUp);
  };

  const handleCropAreaMove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const startPos = getMousePosition(e);
    const startCropArea = { ...cropArea };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const currentPos = getMousePosition(e as any);
      const deltaX = currentPos.x - startPos.x;
      const deltaY = currentPos.y - startPos.y;

      const newX = Math.max(
        0,
        Math.min(
          startCropArea.x + deltaX,
          originalImageSize.width - cropArea.width
        )
      );
      const newY = Math.max(
        0,
        Math.min(
          startCropArea.y + deltaY,
          originalImageSize.height - cropArea.height
        )
      );

      setCropArea((prev) => ({
        ...prev,
        x: newX,
        y: newY,
      }));
    };

    const handleGlobalMouseUp = () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };

    document.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseup", handleGlobalMouseUp);
  };

  const handleCropSave = async () => {
    if (imageToProcess) {
      try {
        const croppedImageDataUrl = await cropImageManually(imageToProcess);

        // Convert data URL to File object
        const response = await fetch(croppedImageDataUrl);
        const blob = await response.blob();
        const file = new File([blob], "community-logo.jpg", {
          type: "image/jpeg",
        });

        // Upload to GraphQL
        uploadLogo({
          variables: {
            file: file,
          },
        });

        setIsCropModalVisible(false);
        setImageToProcess(null);
      } catch (error) {
        message.error("Failed to process image. Please try again.");
        console.error("Error processing image:", error);
      }
    }
  };

  const handleCropCancel = () => {
    setIsCropModalVisible(false);
    setImageToProcess(null);
    setIsImageModalVisible(true);
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      Modal.error({ title: "You can only upload JPG/PNG files!" });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Modal.error({ title: "Image must be smaller than 2MB!" });
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <Card title="Settings">
      {/* Store Details Card */}
      <Card style={{ marginBottom: "24px", borderRadius: "8px" }}>
        <Title level={4} style={{ marginBottom: "24px" }}>
          Entity details
        </Title>

        <Card style={{ borderRadius: "8px" }}>
          <div
            style={{ display: "flex", alignItems: "center", padding: "16px 0" }}
          >
            <div style={{ position: "relative", marginRight: "16px" }}>
              <Avatar
                size={40}
                src={communityImage}
                icon={<ShopOutlined />}
                style={{
                  backgroundColor: communityImage ? "transparent" : "#f0f0f0",
                }}
              />
              <Button
                type="text"
                size="small"
                icon={<CameraOutlined />}
                onClick={() => setIsImageModalVisible(true)}
                style={{
                  position: "absolute",
                  bottom: -4,
                  right: -4,
                  backgroundColor: "#fff",
                  border: "1px solid #d9d9d9",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  fontSize: "10px",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </div>
            {isEditingName ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Input
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  style={{ fontSize: "16px", fontWeight: 500 }}
                  autoFocus
                />
                <Button
                  type="primary"
                  size="small"
                  onClick={handleNameSave}
                  loading={updatingProfile}
                  disabled={updatingProfile}
                >
                  {updatingProfile ? "Saving..." : "Save"}
                </Button>
                <Button
                  size="small"
                  onClick={handleNameCancel}
                  disabled={updatingProfile}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Text strong style={{ fontSize: "16px" }}>
                  {communityName}
                </Text>
                <Button
                  type="text"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={handleNameEdit}
                />
              </div>
            )}
          </div>

          <Divider style={{ margin: "0" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 0",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <EnvironmentOutlined
                style={{
                  fontSize: "20px",
                  marginRight: "16px",
                  marginTop: "4px",
                  color: "#666",
                }}
              />
              <div>
                <div style={{ fontWeight: 500 }}>Billing address</div>
                <div>India</div>
              </div>
            </div>
            <Button type="text" icon={<EditOutlined />} />
          </div>
        </Card>
      </Card>

      {/* Store Defaults Card */}

      {/* Image Upload Modal */}
      <Modal
        title="Update Community Image"
        open={isImageModalVisible}
        onCancel={() => setIsImageModalVisible(false)}
        footer={null}
        centered
      >
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <Avatar
            size={100}
            src={communityImage}
            icon={<ShopOutlined />}
            style={{
              backgroundColor: communityImage ? "transparent" : "#f0f0f0",
              marginBottom: "20px",
            }}
          />
          <div>
            <Upload
              name="image"
              listType="text"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleImageUpload}
              customRequest={({ onSuccess, file }) => {
                // Simulate upload success to trigger onChange
                setTimeout(() => {
                  onSuccess?.("ok");
                }, 0);
              }}
              disabled={uploadingLogo}
            >
              <Button
                icon={<UploadOutlined />}
                type="primary"
                loading={uploadingLogo}
                disabled={uploadingLogo}
              >
                {uploadingLogo ? "Processing..." : "Upload New Image"}
              </Button>
            </Upload>
            <div style={{ marginTop: "8px", color: "#666", fontSize: "12px" }}>
              Recommended: Square image, max 2MB (JPG, PNG)
            </div>
          </div>
        </div>
      </Modal>

      {/* Manual Image Crop Modal */}
      <Modal
        title="Crop Image to Square"
        open={isCropModalVisible}
        onCancel={handleCropCancel}
        footer={[
          <Button
            key="cancel"
            onClick={handleCropCancel}
            disabled={uploadingLogo}
          >
            Back
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={handleCropSave}
            loading={uploadingLogo}
            disabled={uploadingLogo}
          >
            {uploadingLogo ? "Uploading..." : "Save Cropped Image"}
          </Button>,
        ]}
        centered
        width={800}
      >
        <div style={{ padding: "20px 0" }}>
          <div
            style={{ marginBottom: "16px", color: "#666", textAlign: "center" }}
          >
            Drag to select the square area you want to crop
          </div>

          {imageToProcess && (
            <div
              style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}
            >
              {/* Cropping Interface */}
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: "16px", textAlign: "center" }}>
                  <div style={{ marginBottom: "8px", fontWeight: 500 }}>
                    Select Crop Area
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      size="small"
                      onClick={() => {
                        // Reset to center
                        const size =
                          Math.min(
                            originalImageSize.width,
                            originalImageSize.height
                          ) * 0.8;
                        setCropArea({
                          x: (originalImageSize.width - size) / 2,
                          y: (originalImageSize.height - size) / 2,
                          width: size,
                          height: size,
                        });
                      }}
                    >
                      Center
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        // Make smaller
                        const newSize = Math.max(50, cropArea.width * 0.8);
                        setCropArea((prev) => ({
                          ...prev,
                          width: newSize,
                          height: newSize,
                        }));
                      }}
                    >
                      Smaller
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        // Make larger
                        const maxSize = Math.min(
                          originalImageSize.width,
                          originalImageSize.height
                        );
                        const newSize = Math.min(maxSize, cropArea.width * 1.2);
                        setCropArea((prev) => ({
                          ...prev,
                          width: newSize,
                          height: newSize,
                        }));
                      }}
                    >
                      Larger
                    </Button>
                  </div>
                </div>
                <div
                  ref={cropContainerRef}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    border: "2px solid #d9d9d9",
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "crosshair",
                    maxWidth: "100%",
                    userSelect: "none",
                  }}
                  onMouseDown={handleMouseDown}
                >
                  <img
                    ref={imageRef}
                    src={imageToProcess}
                    alt="Crop selection"
                    style={{
                      maxWidth: "400px",
                      maxHeight: "400px",
                      display: "block",
                      userSelect: "none",
                    }}
                    draggable={false}
                    onLoad={() => {
                      if (imageRef.current) {
                        const rect = imageRef.current.getBoundingClientRect();
                        setDisplayImageSize({
                          width: rect.width,
                          height: rect.height,
                        });
                      }
                    }}
                  />

                  {/* Crop overlay */}
                  <div
                    style={{
                      position: "absolute",
                      border: "3px solid #1890ff",
                      backgroundColor: "rgba(24, 144, 255, 0.2)",
                      cursor: "move",
                      left: `${(cropArea.x / originalImageSize.width) * 100}%`,
                      top: `${(cropArea.y / originalImageSize.height) * 100}%`,
                      width: `${(cropArea.width / originalImageSize.width) * 100}%`,
                      height: `${(cropArea.height / originalImageSize.height) * 100}%`,
                      boxSizing: "border-box",
                    }}
                    onMouseDown={handleCropAreaMove}
                  >
                    {/* Corner resize handles */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-6px",
                        left: "-6px",
                        width: "12px",
                        height: "12px",
                        backgroundColor: "#1890ff",
                        border: "2px solid white",
                        borderRadius: "50%",
                        cursor: "nw-resize",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "-6px",
                        right: "-6px",
                        width: "12px",
                        height: "12px",
                        backgroundColor: "#1890ff",
                        border: "2px solid white",
                        borderRadius: "50%",
                        cursor: "ne-resize",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-6px",
                        left: "-6px",
                        width: "12px",
                        height: "12px",
                        backgroundColor: "#1890ff",
                        border: "2px solid white",
                        borderRadius: "50%",
                        cursor: "sw-resize",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-6px",
                        right: "-6px",
                        width: "12px",
                        height: "12px",
                        backgroundColor: "#1890ff",
                        border: "2px solid white",
                        borderRadius: "50%",
                        cursor: "se-resize",
                      }}
                    />

                    {/* Size label */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#1890ff",
                        fontWeight: "bold",
                        fontSize: "12px",
                        textShadow: "1px 1px 2px white",
                        pointerEvents: "none",
                      }}
                    >
                      {Math.round(cropArea.width)} ×{" "}
                      {Math.round(cropArea.height)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div style={{ textAlign: "center", minWidth: "150px" }}>
                <div style={{ marginBottom: "8px", fontWeight: 500 }}>
                  Preview
                </div>
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    border: "2px solid #1890ff",
                    borderRadius: "8px",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <img
                    src={imageToProcess}
                    alt="Crop preview"
                    style={{
                      width: `${(originalImageSize.width / Math.min(cropArea.width, cropArea.height)) * 150}px`,
                      height: `${(originalImageSize.height / Math.min(cropArea.width, cropArea.height)) * 150}px`,
                      marginLeft: `${-(cropArea.x / Math.min(cropArea.width, cropArea.height)) * 150}px`,
                      marginTop: `${-(cropArea.y / Math.min(cropArea.width, cropArea.height)) * 150}px`,
                      objectFit: "none",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              backgroundColor: "#e6f7ff",
              border: "1px solid #91d5ff",
              borderRadius: "6px",
              color: "#0050b3",
              textAlign: "center",
            }}
          >
            <strong>How to use:</strong> Click and drag on the image to select a
            square area to crop. The selection will automatically maintain a
            square shape.
          </div>
        </div>
      </Modal>
    </Card>
  );
}
