"use client"

import { useRef, useState, useEffect } from "react"
import { Card, Avatar, Typography, Button, Tag } from "antd"
import { LeftOutlined, RightOutlined, MessageOutlined, UserAddOutlined } from "@ant-design/icons"

const { Title, Text } = Typography

interface MembersCarouselProps {
  showLarge?: boolean
  professional?: boolean
}

export default function MembersCarousel({ showLarge, professional }: MembersCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const members = [
    {
      id: 1,
      name: "Alex Johnson",
      role: professional ? "Software Engineer" : "Member since 2023",
      avatar: "/placeholder.svg?height=100&width=100",
      status: "New Member",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: professional ? "Marketing Director" : "Member since 2022",
      avatar: "/placeholder.svg?height=100&width=100",
      status: professional ? "Featured" : "",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: professional ? "Product Manager" : "Member since 2021",
      avatar: "/placeholder.svg?height=100&width=100",
      status: "",
    },
    {
      id: 4,
      name: "Emily Davis",
      role: professional ? "UX Designer" : "Member since 2023",
      avatar: "/placeholder.svg?height=100&width=100",
      status: "New Member",
    },
    {
      id: 5,
      name: "David Wilson",
      role: professional ? "Data Scientist" : "Member since 2022",
      avatar: "/placeholder.svg?height=100&width=100",
      status: professional ? "Featured" : "",
    },
    {
      id: 6,
      name: "Jessica Taylor",
      role: professional ? "Content Strategist" : "Member since 2021",
      avatar: "/placeholder.svg?height=100&width=100",
      status: "",
    },
    {
      id: 7,
      name: "Ryan Martinez",
      role: professional ? "Business Analyst" : "Member since 2023",
      avatar: "/placeholder.svg?height=100&width=100",
      status: "New Member",
    },
    {
      id: 8,
      name: "Olivia Anderson",
      role: professional ? "HR Manager" : "Member since 2022",
      avatar: "/placeholder.svg?height=100&width=100",
      status: "",
    },
  ]

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { current } = carouselRef
      const scrollAmount = direction === "left" ? -current.offsetWidth / 2 : current.offsetWidth / 2

      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { current } = carouselRef
      setCanScrollLeft(current.scrollLeft > 0)
      setCanScrollRight(current.scrollLeft < current.scrollWidth - current.clientWidth - 10)
    }
  }

  useEffect(() => {
    const { current } = carouselRef
    if (current) {
      current.addEventListener("scroll", checkScrollButtons)
      // Check on mount
      checkScrollButtons()
      // Check on resize
      window.addEventListener("resize", checkScrollButtons)

      return () => {
        current.removeEventListener("scroll", checkScrollButtons)
        window.removeEventListener("resize", checkScrollButtons)
      }
    }
  }, [])

  return (
    <div style={{ position: "relative" }}>
      {canScrollLeft && (
        <Button
          icon={<LeftOutlined />}
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            background: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
          onClick={() => scroll("left")}
        />
      )}

      <div
        ref={carouselRef}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          gap: "16px",
          padding: "8px 4px",
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        {members.map((member) => (
          <Card
            key={member.id}
            style={{
              width: showLarge ? 280 : 220,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
            bodyStyle={{ padding: 16 }}
          >
            <div style={{ marginBottom: 16, marginTop: showLarge ? 16 : 0 }}>
              <Avatar size={showLarge ? 96 : 64} src={member.avatar} style={{ marginBottom: 8 }}>
                {member.name.charAt(0)}
              </Avatar>
            </div>

            <Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>
              {member.name}
            </Title>
            <Text type="secondary">{member.role}</Text>

            {member.status && (
              <Tag color="blue" style={{ margin: "8px 0" }}>
                {member.status}
              </Tag>
            )}

            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              <Button icon={<MessageOutlined />}>Message</Button>
              <Button icon={<UserAddOutlined />}>Connect</Button>
            </div>
          </Card>
        ))}
      </div>

      {canScrollRight && (
        <Button
          icon={<RightOutlined />}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            background: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
          onClick={() => scroll("right")}
        />
      )}
    </div>
  )
}
