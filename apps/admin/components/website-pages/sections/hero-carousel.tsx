"use client"

import React from "react"

import { useState } from "react"
import { Carousel, Button, Typography } from "antd"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"

const { Title, Paragraph } = Typography

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  const slides = [
    {
      title: "Connect with Your Community",
      description: "Join events, groups, and meet like-minded people in your area",
      image: "/placeholder.svg?height=600&width=1200",
      cta: "Join Now",
      ctaLink: "/register",
    },
    {
      title: "Discover Local Events",
      description: "Find and participate in events happening around you",
      image: "/placeholder.svg?height=600&width=1200",
      cta: "Browse Events",
      ctaLink: "/events",
    },
    {
      title: "Join Interest Groups",
      description: "Connect with people who share your passions and interests",
      image: "/placeholder.svg?height=600&width=1200",
      cta: "Explore Groups",
      ctaLink: "/groups",
    },
  ]

  const carouselRef = React.useRef(null)

  const nextSlide = () => {
    carouselRef.current.next()
  }

  const prevSlide = () => {
    carouselRef.current.prev()
  }

  const onChange = (currentSlide) => {
    setCurrent(currentSlide)
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "500px" }}>
      <Carousel ref={carouselRef} afterChange={onChange} autoplay effect="fade" style={{ height: "500px" }}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              style={{
                height: "500px",
                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  maxWidth: "1200px",
                  width: "100%",
                  padding: "0 24px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <Title style={{ color: "white", fontSize: "48px", marginBottom: "16px" }}>{slide.title}</Title>
                <Paragraph
                  style={{
                    color: "white",
                    fontSize: "18px",
                    marginBottom: "32px",
                    maxWidth: "600px",
                    margin: "0 auto 32px",
                  }}
                >
                  {slide.description}
                </Paragraph>
                <Button type="primary" size="large" href={slide.ctaLink}>
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <Button
        icon={<LeftOutlined />}
        style={{
          position: "absolute",
          top: "50%",
          left: "16px",
          transform: "translateY(-50%)",
          zIndex: 2,
          background: "rgba(0, 0, 0, 0.3)",
          borderColor: "transparent",
          color: "white",
        }}
        onClick={prevSlide}
      />

      <Button
        icon={<RightOutlined />}
        style={{
          position: "absolute",
          top: "50%",
          right: "16px",
          transform: "translateY(-50%)",
          zIndex: 2,
          background: "rgba(0, 0, 0, 0.3)",
          borderColor: "transparent",
          color: "white",
        }}
        onClick={nextSlide}
      />

      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          gap: "8px",
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: index === current ? "white" : "rgba(255, 255, 255, 0.5)",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
            onClick={() => carouselRef.current.goTo(index)}
          />
        ))}
      </div>
    </div>
  )
}
