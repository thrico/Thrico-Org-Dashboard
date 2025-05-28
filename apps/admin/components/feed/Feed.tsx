import { BarChartOutlined, MoreOutlined } from "@ant-design/icons";
import { Card, Typography, Button, Space, Divider, List, Dropdown } from "antd";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdOutlineRepeat } from "react-icons/md";

import FeedUserDetails from "./FeedUserDetails";
import { FeedProps } from "./types";
import Like from "./Action/Like";
import Analytics from "./Analytics";
import Comments from "./comment/Comment";
import Poll from "./Poll";

const { Text, Paragraph } = Typography;

export default function Feed({ feed }: { feed: FeedProps }) {
  return (
    <List.Item style={{ width: "70%" }}>
      <Card
        key={feed.id}
        style={{
          width: "100%",
          borderRadius: 8,
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <FeedUserDetails {...feed} />
          <Dropdown
            menu={{
              items: [
                { key: "1", label: "Save post" },
                { key: "2", label: "Hide post" },
                { key: "3", label: "Report" },
              ],
            }}
            placement="bottomRight"
          >
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        </div>

        {feed?.source === "dashboard" && (
          <div style={{ margin: "16px 0" }}>
            <Paragraph>{feed?.description}</Paragraph>
          </div>
        )}

        {feed?.source === "poll" && feed?.poll?.id && (
          <Poll id={feed?.poll?.id} />
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space>
            <Text type="secondary">{feed?.totalReactions} Likes</Text>
            <Text type="secondary">•</Text>
            <Text type="secondary">{feed?.totalComment} Comments</Text>
            <Text type="secondary">•</Text>
            <Text type="secondary">{feed?.totalReShare} Shares</Text>
          </Space>
          <Analytics />
        </div>

        <Divider style={{ margin: "12px 0" }} />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Like item={feed} />
          <Comments id={feed.id} />

          <Button type="text" icon={<MdOutlineRepeat size={17} />}>
            Share
          </Button>
        </div>
      </Card>
    </List.Item>
  );
}
