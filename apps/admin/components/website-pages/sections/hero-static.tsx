import { Button, Typography } from "antd"

const { Title, Paragraph } = Typography

interface HeroStaticProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  backgroundImage?: string
}

export default function HeroStatic({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage = "/placeholder.svg?height=600&width=1200",
}: HeroStaticProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
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
        <Title style={{ color: "white", fontSize: "48px", marginBottom: "16px" }}>{title}</Title>
        <Paragraph
          style={{ color: "white", fontSize: "18px", marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px" }}
        >
          {subtitle}
        </Paragraph>
        <Button type="primary" size="large" href={ctaLink}>
          {ctaText}
        </Button>
      </div>
    </div>
  )
}
