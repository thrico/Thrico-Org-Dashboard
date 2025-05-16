"use client";

import { useState } from "react";
import {
  Modal,
  Input,
  Button,
  Divider,
  Space,
  Tooltip,
  List,
  UploadFile,
} from "antd";
import { SmileOutlined, FileOutlined } from "@ant-design/icons";
import { getEntity } from "../../../graphql/actions";
import UserAvatar from "../../../screen/comman/UserAvatar";
import Image from "next/image";
import AddMedia from "./Media";
import { addFeed } from "../../../graphql/actions/feed";
import AllMedia from "./AllMedia";
interface ImageItem {
  uid: string;
  name: string;
  status: "done" | "uploading" | "error";
  url: string;
  isExternalUrl?: boolean;
}
const { TextArea } = Input;

export default function PostModal() {
  const onCompleted = () => {
    handleCancel();
  };
  const [add, { loading: addLoading }] = addFeed({
    onCompleted,
  });
  const { data } = getEntity();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setPostText("");
  };

  const handlePost = () => {
    add({
      variables: {
        input: {
          description: postText,
          media: fileList ? fileList.map((file) => file.originFileObj) : [],
        },
      },
    });
  };

  const containerStyle = {
    padding: "16px",
  };

  const actionBarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "24px",
  };

  const actionButtonsStyle = {
    display: "flex",
  };

  const postButtonContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  return (
    <div style={containerStyle}>
      <Button type="primary" onClick={showModal}>
        Create Post
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={
          <div style={actionBarStyle}>
            <Space style={actionButtonsStyle}>
              <Button type="text" icon={<SmileOutlined />} shape="circle" />
              <Tooltip title={"Add Media"}>
                <AddMedia fileList={fileList} setFileList={setFileList} />
              </Tooltip>
              <Tooltip title={"Add Document"}>
                <Button type="text" icon={<FileOutlined />} shape="circle" />
              </Tooltip>
            </Space>
            <div style={postButtonContainerStyle}>
              <Button
                type="primary"
                loading={addLoading}
                disabled={!postText.trim()}
                onClick={handlePost}
                style={{
                  borderRadius: "20px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                }}
              >
                Post
              </Button>
            </div>
          </div>
        }
        width={600}
      >
        <List>
          <List.Item>
            <List.Item.Meta
              avatar={<UserAvatar size={56} src={data?.getEntity?.logo} />}
              title={data?.getEntity?.name}
              description={`Anyone on platform`}
            />
          </List.Item>
        </List>

        <TextArea
          placeholder="What do you want to talk about?"
          autoSize={{ minRows: 5, maxRows: 10 }}
          showCount
          size="small"
          maxLength={1000}
          value={postText}
          variant="borderless"
          onChange={(e) => setPostText(e.target.value)}
          style={{
            fontSize: "18px",
            padding: "0",
            resize: "none",
            boxShadow: "none",
          }}
        />

        <Divider style={{ marginTop: "2rem", marginBottom: "16px" }} />

        <AllMedia fileList={fileList} setFileList={setFileList} />
      </Modal>
    </div>
  );
}
