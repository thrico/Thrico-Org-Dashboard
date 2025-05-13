"use client"

import { useState } from "react"
import { Card, Avatar, Typography, Button } from "antd"
import { LeftOutlined, RightOutlined, CommentOutlined } from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography

interface TestimonialsProps {
  featured?: boolean
  professional?: boolean
}

export default function Testimonials({ featured, professional }: TestimonialsProps) {
  const [current, setCurrent] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Jennifer Smith",
      role: professional ? "CEO, TechStart" : "Community Member",
      quote:
        "Being part of this community has opened so many doors for me professionally. I've made valuable connections and found amazing opportunities.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Robert Johnson",
      role: professional ? "Marketing Director, GrowthCo" : "Event Organizer",
      quote:
        "The platform is incredibly easy to use and has helped our organization grow tremendously. We've been able to reach more people than ever before.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Michelle Davis",
      role: professional ? "Freelance Designer" : "Group Leader",
      quote:
        "I found my dream job through this platform! The community is supportive and the resources available are invaluable for professional growth.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  const nextTestimonial = () => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1)
  }

  const prevTestimonial = () => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Card
        style={{
          maxWidth: 800,
          width: "100%",
          background: featured ? "#f0f7ff" : undefined,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            padding: 16,
          }}
        >
          <Avatar size={96} src={testimonials[current].avatar}>
            {testimonials[current].name.charAt(0)}
          </Avatar>

          <div style={{ textAlign: "center" }}>
            <CommentOutlined style={{ fontSize: 32, color: "#1890ff", opacity: 0.4, marginBottom: 16 }} />
            <Paragraph style={{ fontSize: 18, fontStyle: "italic", marginBottom: 16 }}>
              "{testimonials[current].quote}"
            </Paragraph>
            <Title level={4} style={{ marginBottom: 4 }}>
              {testimonials[current].name}
            </Title>
            <Text type="secondary">{testimonials[current].role}</Text>
          </div>
        </div>
      </Card>

      <div style={{ display: "flex", alignItems: "center", marginTop: 24, gap: 16 }}>
        <Button icon={<LeftOutlined />} onClick={prevTestimonial} shape="circle" />

        <div style={{ display: "flex", gap: 8 }}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: index === current ? "#1890ff" : "#d9d9d9",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        <Button icon={<RightOutlined />} onClick={nextTestimonial} shape="circle" />
      </div>
    </div>
  )
}
