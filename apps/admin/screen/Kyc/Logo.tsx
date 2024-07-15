import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Flex,
  Form,
  Image,
  message,
  Space,
  Upload,
} from "antd";
import type { GetProp, UploadProps } from "antd";
import { MdOutlineUpdate } from "react-icons/md";
import ImgCrop from "antd-img-crop";
import { cover } from "./types";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/webp";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG/WEBP file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Logo = ({ imageUrl, setImageUrl, setCover, buttonText }: cover) => {
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps["onChange"] = (info) => {
    console.log(info);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setCover(info.file.originFileObj as FileType);
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  return (
    <>
      <Form.Item name="logo" label="Upload Logo">
        <ImgCrop rotationSlider aspectSlider>
          <Upload
            style={{ width: "100%" }}
            showUploadList={false}
            customRequest={dummyRequest}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" , height: 100 }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </ImgCrop>
      </Form.Item>
    </>
  );
};

export default Logo;
