import { Card, Row, Col, Typography, Tag, Space } from "antd"
import { TeamOutlined, ArrowRightOutlined } from "@ant-design/icons"

const { Title, Text } = Typography
const { Meta } = Card

interface GroupsGridProps {
  featured?: boolean
  professional?: boolean
}

export default function GroupsGrid({ featured, professional }: GroupsGridProps) {
  const groups = [
    {
      id: 1,
      name: "Tech Enthusiasts",
      members: 1250,
      category: professional ? "Technology" : "Hobby",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Business Network",
      members: 980,
      category: "Professional",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Creative Minds",
      members: 756,
      category: professional ? "Design" : "Arts",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Outdoor Adventures",
      members: 1120,
      category: professional ? "Recreation" : "Lifestyle",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      name: "Health & Wellness",
      members: 890,
      category: "Lifestyle",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      name: "Entrepreneurs Club",
      members: 670,
      category: "Business",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <Row gutter={[24, 24]}>
      {groups.map((group) => (
        <Col xs={24} sm={12} lg={8} key={group.id}>
          <Card
            hoverable
            cover={
              <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                <img
                  alt={group.name}
                  src={group.image || "/placeholder.svg"}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                    padding: "16px",
                  }}
                >
                  <Title level={4} style={{ color: "white", margin: 0 }}>
                    {group.name}
                  </Title>
                  <Text style={{ color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center" }}>
                    <TeamOutlined style={{ marginRight: 8 }} />
                    {group.members.toLocaleString()} members
                  </Text>
                </div>
              </div>
            }
          >
            <Space style={{ width: "100%", justifyContent: "space-between" }}>
              <Tag color={professional ? "blue" : "green"}>{group.category}</Tag>
              {featured && <Tag color="orange">Featured</Tag>}
            </Space>

            <div style={{ marginTop: 16 }}>
              <a href={`/groups/${group.id}`} style={{ display: "flex", alignItems: "center" }}>
                View Group <ArrowRightOutlined style={{ marginLeft: 8 }} />
              </a>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
