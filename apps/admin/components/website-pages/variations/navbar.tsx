"use client"

import { useState, useEffect } from "react"
import { Layout, Menu, Button, Drawer, Space, Typography, Dropdown } from "antd"
import {
  MenuOutlined,
  UserOutlined,
  LoginOutlined,
  HomeOutlined,
  CalendarOutlined,
  TeamOutlined,
  ShoppingOutlined,
  ReadOutlined,
  PictureOutlined,
  CommentOutlined,
  InfoCircleOutlined,
  DownOutlined,
} from "@ant-design/icons"
import Link from "next/link"

const { Header } = Layout
const { Title } = Typography

interface NavbarProps {
  variation?: string
}

export default function Navbar({ variation = "default" }: NavbarProps) {
  const [visible, setVisible] = useState(false)
  const [navItems, setNavItems] = useState([])

  useEffect(() => {
    // Load navbar items from localStorage or use defaults
    const savedNavItems = localStorage.getItem("thrico-navbar-items")
    if (savedNavItems) {
      setNavItems(JSON.parse(savedNavItems))
    } else {
      setNavItems(defaultNavItems)
    }
  }, [])

  const defaultNavItems = [
    { key: "home", label: "Home", icon: <HomeOutlined />, href: "/" },
    { key: "events", label: "Events", icon: <CalendarOutlined />, href: "/events" },
    { key: "groups", label: "Groups", icon: <TeamOutlined />, href: "/groups" },
    { key: "jobs", label: "Jobs", icon: <ShoppingOutlined />, href: "/jobs" },
    { key: "news", label: "News", icon: <ReadOutlined />, href: "/news" },
    { key: "gallery", label: "Gallery", icon: <PictureOutlined />, href: "/gallery" },
    { key: "testimonials", label: "Testimonials", icon: <CommentOutlined />, href: "/testimonials" },
    {
      key: "about",
      label: "About",
      icon: <InfoCircleOutlined />,
      children: [
        { key: "about-us", label: "About Us", href: "/about" },
        { key: "contact-us", label: "Contact Us", href: "/contact" },
        { key: "privacy", label: "Privacy Policy", href: "/privacy" },
      ],
    },
  ]

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const renderMenuItem = (item) => {
    if (item.children) {
      return (
        <Dropdown
          menu={{
            items: item.children.map((child) => ({
              key: child.key,
              label: <Link href={child.href}>{child.label}</Link>,
            })),
          }}
        >
          <a onClick={(e) => e.preventDefault()} style={{ display: "flex", alignItems: "center" }}>
            {item.icon}
            <span style={{ marginLeft: 8, marginRight: 8 }}>{item.label}</span>
            <DownOutlined />
          </a>
        </Dropdown>
      )
    }

    return (
      <Link href={item.href}>
        {item.icon}
        <span style={{ marginLeft: 8 }}>{item.label}</span>
      </Link>
    )
  }

  // Render different navbar variations
  if (variation === "centered") {
    return (
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          padding: "0 24px",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <Title level={3} style={{ margin: 0, marginRight: 40 }}>
                Thrico
              </Title>
            </Link>

            <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
              <Menu
                mode="horizontal"
                style={{ border: "none", justifyContent: "center" }}
                items={navItems.map((item) => ({
                  key: item.key,
                  label: renderMenuItem(item),
                  children: item.children
                    ? item.children.map((child) => ({
                        key: child.key,
                        label: <Link href={child.href}>{child.label}</Link>,
                      }))
                    : undefined,
                }))}
              />
            </div>

            <div style={{ display: "none", alignItems: "center", gap: 8 }}>
              <Button type="default" icon={<LoginOutlined />}>
                Login
              </Button>
              <Button type="primary" icon={<UserOutlined />}>
                Register
              </Button>
            </div>

            <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} style={{ display: "block" }} />
          </div>
        </div>

        <Drawer title="Menu" placement="right" onClose={onClose} open={visible}>
          <Menu
            mode="vertical"
            style={{ border: "none" }}
            items={navItems.map((item) => ({
              key: item.key,
              label: item.children ? (
                <span>
                  {item.icon}
                  <span style={{ marginLeft: 8 }}>{item.label}</span>
                </span>
              ) : (
                <Link href={item.href}>
                  {item.icon}
                  <span style={{ marginLeft: 8 }}>{item.label}</span>
                </Link>
              ),
              children: item.children
                ? item.children.map((child) => ({
                    key: child.key,
                    label: <Link href={child.href}>{child.label}</Link>,
                  }))
                : undefined,
            }))}
          />
          <div style={{ marginTop: 24 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button type="default" icon={<LoginOutlined />} block>
                Login
              </Button>
              <Button type="primary" icon={<UserOutlined />} block>
                Register
              </Button>
            </Space>
          </div>
        </Drawer>
      </Header>
    )
  }

  if (variation === "dark") {
    return (
      <Header
        style={{ position: "sticky", top: 0, zIndex: 1, width: "100%", padding: "0 24px", background: "#001529" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <Title level={3} style={{ margin: 0, color: "white" }}>
                Thrico
              </Title>
            </Link>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ border: "none", minWidth: 600 }}
              items={navItems.map((item) => ({
                key: item.key,
                label: renderMenuItem(item),
                children: item.children
                  ? item.children.map((child) => ({
                      key: child.key,
                      label: <Link href={child.href}>{child.label}</Link>,
                    }))
                  : undefined,
              }))}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 16 }}>
              <Button type="ghost" icon={<LoginOutlined />} style={{ color: "white" }}>
                Login
              </Button>
              <Button type="primary" icon={<UserOutlined />}>
                Register
              </Button>
            </div>

            <Button
              type="text"
              icon={<MenuOutlined style={{ color: "white" }} />}
              onClick={showDrawer}
              style={{ display: "none", marginLeft: 16 }}
            />
          </div>
        </div>

        <Drawer title="Menu" placement="right" onClose={onClose} open={visible}>
          <Menu
            mode="vertical"
            style={{ border: "none" }}
            items={navItems.map((item) => ({
              key: item.key,
              label: item.children ? (
                <span>
                  {item.icon}
                  <span style={{ marginLeft: 8 }}>{item.label}</span>
                </span>
              ) : (
                <Link href={item.href}>
                  {item.icon}
                  <span style={{ marginLeft: 8 }}>{item.label}</span>
                </Link>
              ),
              children: item.children
                ? item.children.map((child) => ({
                    key: child.key,
                    label: <Link href={child.href}>{child.label}</Link>,
                  }))
                : undefined,
            }))}
          />
          <div style={{ marginTop: 24 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button type="default" icon={<LoginOutlined />} block>
                Login
              </Button>
              <Button type="primary" icon={<UserOutlined />} block>
                Register
              </Button>
            </Space>
          </div>
        </Drawer>
      </Header>
    )
  }

  // Default variation
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        padding: "0 24px",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <Title level={3} style={{ margin: 0 }}>
              Thrico
            </Title>
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Menu
            mode="horizontal"
            style={{ border: "none", minWidth: 600, display: "flex" }}
            items={navItems.map((item) => ({
              key: item.key,
              label: renderMenuItem(item),
              children: item.children
                ? item.children.map((child) => ({
                    key: child.key,
                    label: <Link href={child.href}>{child.label}</Link>,
                  }))
                : undefined,
            }))}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 16 }}>
            <Button type="default" icon={<LoginOutlined />}>
              Login
            </Button>
            <Button type="primary" icon={<UserOutlined />}>
              Register
            </Button>
          </div>

          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={showDrawer}
            style={{ display: "none", marginLeft: 16 }}
          />
        </div>
      </div>

      <Drawer title="Menu" placement="right" onClose={onClose} open={visible}>
        <Menu
          mode="vertical"
          style={{ border: "none" }}
          items={navItems.map((item) => ({
            key: item.key,
            label: item.children ? (
              <span>
                {item.icon}
                <span style={{ marginLeft: 8 }}>{item.label}</span>
              </span>
            ) : (
              <Link href={item.href}>
                {item.icon}
                <span style={{ marginLeft: 8 }}>{item.label}</span>
              </Link>
            ),
            children: item.children
              ? item.children.map((child) => ({
                  key: child.key,
                  label: <Link href={child.href}>{child.label}</Link>,
                }))
              : undefined,
          }))}
        />
        <div style={{ marginTop: 24 }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Button type="default" icon={<LoginOutlined />} block>
              Login
            </Button>
            <Button type="primary" icon={<UserOutlined />} block>
              Register
            </Button>
          </Space>
        </div>
      </Drawer>
    </Header>
  )
}
