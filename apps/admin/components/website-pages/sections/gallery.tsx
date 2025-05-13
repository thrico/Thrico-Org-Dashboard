"use client"

import { useState } from "react"
import { Row, Col, Modal } from "antd"
import { CloseOutlined } from "@ant-design/icons"

interface GalleryProps {
  minimal?: boolean
}

export default function Gallery({ minimal }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const images = [
    {
      id: 1,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Community event",
      caption: "Annual conference",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Workshop session",
      caption: "Leadership workshop",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Networking event",
      caption: "Networking mixer",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Award ceremony",
      caption: "Excellence awards",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Team building",
      caption: "Team retreat",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Community service",
      caption: "Volunteer day",
    },
  ]

  // For minimal gallery, show fewer images
  const displayImages = minimal ? images.slice(0, 4) : images

  return (
    <>
      <Row gutter={[16, 16]}>
        {displayImages.map((image) => (
          <Col xs={24} sm={12} lg={8} key={image.id}>
            <div
              style={{
                position: "relative",
                height: 250,
                overflow: "hidden",
                borderRadius: 8,
                cursor: "pointer",
              }}
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.5)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: 16,
                  color: "white",
                  fontWeight: 500,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = "1"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = "0"
                }}
              >
                {image.caption}
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Modal
        open={!!selectedImage}
        footer={null}
        onCancel={() => setSelectedImage(null)}
        width="80%"
        style={{ maxWidth: 1000 }}
        closeIcon={<CloseOutlined style={{ color: "white" }} />}
        bodyStyle={{ padding: 0 }}
        centered
      >
        <img
          src={selectedImage || ""}
          alt="Enlarged view"
          style={{ width: "100%", height: "auto", maxHeight: "80vh", objectFit: "contain" }}
        />
      </Modal>
    </>
  )
}
