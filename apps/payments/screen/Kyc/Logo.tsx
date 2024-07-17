import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, message, Upload } from "antd";
import type { GetProp, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const Logo = ({ logo, setLogo, logoPreview, setLogoPreview }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const updateImage = async (info: any) => {
    if (info.file) {
      await setLogo([info?.file as File]);
      await setLogoPreview(URL.createObjectURL(logo[0]));
    }
  };
  return (
    <>
      <Form.Item name="logo" label="Upload Logo">
        <Upload
          accept="image/png, image/jpeg"
          maxCount={1}
          fileList={logo as any}
          customRequest={async (info) => {
            updateImage(info);
          }}
          showUploadList={false}
          listType="picture-card"
        >
          {logoPreview ? (
            <img src={logoPreview} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </Form.Item>
    </>
  );
};

export default Logo;
