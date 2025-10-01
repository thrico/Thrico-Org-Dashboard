"use client";

import {
  PlusCircleOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Card, Tabs, Tag, Badge, Row, Col } from "antd";
import Image from "next/image";

const { TabPane } = Tabs;

const mediaItems = [
  {
    id: "1",
    type: "image",
    title: "Opening Keynote",
    url: "/placeholder.svg",
    tags: ["keynote", "day1"],
    isPublic: true,
  },
  {
    id: "2",
    type: "image",
    title: "Workshop Session",
    url: "/placeholder.svg",
    tags: ["workshop", "day1"],
    isPublic: true,
  },
  {
    id: "3",
    type: "image",
    title: "Networking Event",
    url: "/placeholder.svg",
    tags: ["networking", "day1"],
    isPublic: true,
  },
  {
    id: "4",
    type: "image",
    title: "Panel Discussion",
    url: "/placeholder.svg",
    tags: ["panel", "day2"],
    isPublic: false,
  },
  {
    id: "5",
    type: "video",
    title: "Closing Remarks",
    url: "/placeholder.svg",
    tags: ["closing", "day3"],
    isPublic: false,
  },
  {
    id: "6",
    type: "image",
    title: "Sponsor Booth",
    url: "/placeholder.svg",
    tags: ["sponsor", "day2"],
    isPublic: true,
  },
];

function MediaCard({ item }: { item: (typeof mediaItems)[number] }) {
  return (
    <Card
      key={item.id}
      cover={
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <Image
            src={item.url}
            alt={item.title}
            fill
            className="object-cover rounded-t-lg"
          />
          {item.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="rounded-full bg-white/80 p-2">
                <VideoCameraOutlined style={{ fontSize: 32 }} />
              </div>
            </div>
          )}
        </div>
      }
      actions={[
        <Button key="edit" size="small">
          Edit
        </Button>,
        <Button key="toggle" size="small">
          {item.isPublic ? "Make Private" : "Make Public"}
        </Button>,
      ]}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{item.title}</span>
        <Badge
          count={item.isPublic ? "Public" : "Private"}
          style={{
            backgroundColor: item.isPublic ? "#52c41a" : "#d9d9d9",
          }}
        />
      </div>
      <div className="flex flex-wrap gap-1">
        {item.tags.map((tag) => (
          <Tag key={tag} color="blue">
            {tag}
          </Tag>
        ))}
      </div>
    </Card>
  );
}

function EventMedia() {
  const filteredItems = {
    all: mediaItems,
    public: mediaItems.filter((i) => i.isPublic),
    private: mediaItems.filter((i) => !i.isPublic),
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Media Gallery</h2>
        <div className="flex gap-2">
          <Button type="primary" icon={<UploadOutlined />}>
            Upload Media
          </Button>
          <Button icon={<PlusCircleOutlined />}>Import from Social</Button>
        </div>
      </div>

      <Tabs defaultActiveKey="all">
        {["all", "public", "private"].map((key) => (
          <TabPane
            tab={key.charAt(0).toUpperCase() + key.slice(1) + " Media"}
            key={key}
          >
            <Row gutter={[16, 16]}>
              {filteredItems[key as keyof typeof filteredItems].map((item) => (
                <Col key={item.id} xs={24} sm={12} lg={8}>
                  <MediaCard item={item} />
                </Col>
              ))}
              <Col xs={24} sm={12} lg={8}>
                <Card
                  className="h-full min-h-[200px] flex items-center justify-center border-dashed"
                  style={{ borderStyle: "dashed", textAlign: "center" }}
                >
                  <Button type="dashed" icon={<PlusCircleOutlined />}>
                    Add Media
                  </Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default EventMedia;
