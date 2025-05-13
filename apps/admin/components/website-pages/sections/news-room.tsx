"use client"

import { useEffect, useRef } from "react"
import { Card, Row, Col, Typography, Tag, Space } from "antd"
import { CalendarOutlined, ArrowRightOutlined } from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography

interface NewsRoomProps {
  showTicker?: boolean
  twoColumn?: boolean
}

export default function NewsRoom({ showTicker, twoColumn }: NewsRoomProps) {
  const tickerRef = useRef<HTMLDivElement>(null)

  const news = [
    {
      id: 1,
      title: "Community Platform Reaches 10,000 Members",
      date: "May 10, 2025",
      excerpt:
        "Our platform has reached a significant milestone with 10,000 active members participating in various groups and events.",
      category: "Announcement",
      featured: true,
    },
    {
      id: 2,
      title: "New Features Released for Enhanced User Experience",
      date: "May 5, 2025",
      excerpt:
        "We've launched several new features to improve user experience, including enhanced messaging and event management tools.",
      category: "Product Update",
      featured: false,
    },
    {
      id: 3,
      title: "Annual Community Awards Announced",
      date: "April 28, 2025",
      excerpt: "The nominees for our annual community awards have been announced. Voting will begin next week.",
      category: "Event",
      featured: true,
    },
    {
      id: 4,
      title: "Partnership with Local Businesses Expands Opportunities",
      date: "April 20, 2025",
      excerpt:
        "We've partnered with several local businesses to provide exclusive opportunities and discounts for our members.",
      category: "Partnership",
      featured: false,
    },
  ]

  // For ticker animation
  useEffect(() => {
    if (showTicker && tickerRef.current) {
      const tickerWidth = tickerRef.current.scrollWidth
      const animation = tickerRef.current.animate(
        [{ transform: "translateX(0)" }, { transform: `translateX(-${tickerWidth / 2}px)` }],
        {
          duration: 20000,
          iterations: Number.POSITIVE_INFINITY,
        },
      )

      return () => {
        animation.cancel()
      }
    }
  }, [showTicker])

  // Split news for two-column layout
  const featuredNews = twoColumn ? news.filter((item) => item.featured) : []
  const regularNews = twoColumn ? news.filter((item) => !item.featured) : news

  if (showTicker) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            background: "#f5f5f5",
            padding: "12px 0",
            overflow: "hidden",
            marginBottom: 24,
          }}
        >
          <div
            ref={tickerRef}
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              width: "fit-content",
            }}
          >
            {news.map((item) => (
              <div key={item.id} style={{ display: "inline-block", marginRight: 32 }}>
                <Text strong>{item.category}:</Text> {item.title}
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {news.map((item) => (
              <div key={`dup-${item.id}`} style={{ display: "inline-block", marginRight: 32 }}>
                <Text strong>{item.category}:</Text> {item.title}
              </div>
            ))}
          </div>
        </div>

        <Row gutter={[24, 24]}>
          {news.map((item) => (
            <Col xs={24} md={12} key={item.id}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <Title level={4} style={{ margin: 0 }}>
                    {item.title}
                  </Title>
                  <Tag color="blue">{item.category}</Tag>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <Text type="secondary">
                    <CalendarOutlined style={{ marginRight: 8 }} />
                    {item.date}
                  </Text>
                </div>
                <Paragraph>{item.excerpt}</Paragraph>
                <a href={`/news/${item.id}`} style={{ display: "flex", alignItems: "center" }}>
                  Read More <ArrowRightOutlined style={{ marginLeft: 8 }} />
                </a>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    )
  }

  if (twoColumn) {
    return (
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Title level={4} style={{ marginBottom: 16 }}>
            Featured
          </Title>
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            {featuredNews.map((item) => (
              <Card key={item.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <Title level={4} style={{ margin: 0 }}>
                    {item.title}
                  </Title>
                  <Tag color="blue">{item.category}</Tag>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <Text type="secondary">
                    <CalendarOutlined style={{ marginRight: 8 }} />
                    {item.date}
                  </Text>
                </div>
                <Paragraph>{item.excerpt}</Paragraph>
                <a href={`/news/${item.id}`} style={{ display: "flex", alignItems: "center" }}>
                  Read More <ArrowRightOutlined style={{ marginLeft: 8 }} />
                </a>
              </Card>
            ))}
          </Space>
        </Col>

        <Col xs={24} lg={16}>
          <Title level={4} style={{ marginBottom: 16 }}>
            Latest News
          </Title>
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            {regularNews.map((item) => (
              <Card key={item.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <Title level={4} style={{ margin: 0 }}>
                    {item.title}
                  </Title>
                  <Tag color="blue">{item.category}</Tag>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <Text type="secondary">
                    <CalendarOutlined style={{ marginRight: 8 }} />
                    {item.date}
                  </Text>
                </div>
                <Paragraph>{item.excerpt}</Paragraph>
                <a href={`/news/${item.id}`} style={{ display: "flex", alignItems: "center" }}>
                  Read More <ArrowRightOutlined style={{ marginLeft: 8 }} />
                </a>
              </Card>
            ))}
          </Space>
        </Col>
      </Row>
    )
  }

  return (
    <Row gutter={[24, 24]}>
      {news.map((item) => (
        <Col xs={24} md={12} key={item.id}>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <Title level={4} style={{ margin: 0 }}>
                {item.title}
              </Title>
              <Tag color="blue">{item.category}</Tag>
            </div>
            <div style={{ marginBottom: 12 }}>
              <Text type="secondary">
                <CalendarOutlined style={{ marginRight: 8 }} />
                {item.date}
              </Text>
            </div>
            <Paragraph>{item.excerpt}</Paragraph>
            <a href={`/news/${item.id}`} style={{ display: "flex", alignItems: "center" }}>
              Read More <ArrowRightOutlined style={{ marginLeft: 8 }} />
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
