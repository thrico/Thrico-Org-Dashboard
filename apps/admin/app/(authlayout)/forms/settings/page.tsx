"use client"

import { useState } from "react"
import { Typography, Button, Card, Form, Input, Switch, Tabs, Row, Col, InputNumber } from "antd"

const { Title, Text } = Typography
const { TextArea } = Input
const { TabPane } = Tabs

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  // Mock settings data
  const [settings, setSettings] = useState({
    general: {
      siteName: "Form Management Platform",
      siteDescription: "Create and manage custom forms for your organization",
      logo: "",
      primaryColor: "#1677ff",
    },
    notifications: {
      emailNotifications: true,
      formSubmissions: true,
      systemUpdates: false,
      marketingEmails: false,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      ipRestriction: false,
      allowedIPs: "",
    },
  })

  // Update settings
  const updateSettings = (category: string, field: string, value: any) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category as keyof typeof settings],
        [field]: value,
      },
    })
  }

  // Save settings
  const saveSettings = () => {
    console.log("Saving settings:", settings)
    // In a real app, you would save to your backend here
    alert("Settings saved successfully!")
  }

  return (
    <div>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={2} style={{ margin: 0 }}>
          Settings
        </Title>
        <Button type="primary" onClick={saveSettings}>
          Save Changes
        </Button>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="General" key="general">
          <Card title="Site Settings">
            <Form layout="vertical">
              <Form.Item label="Site Name">
                <Input
                  value={settings.general.siteName}
                  onChange={(e) => updateSettings("general", "siteName", e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Site Description">
                <TextArea
                  value={settings.general.siteDescription}
                  onChange={(e) => updateSettings("general", "siteDescription", e.target.value)}
                  rows={4}
                />
              </Form.Item>

              <Form.Item label="Logo URL">
                <Input
                  value={settings.general.logo}
                  onChange={(e) => updateSettings("general", "logo", e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
              </Form.Item>

              <Form.Item label="Primary Color">
                <Row gutter={16}>
                  <Col span={2}>
                    <Input
                      type="color"
                      value={settings.general.primaryColor}
                      onChange={(e) => updateSettings("general", "primaryColor", e.target.value)}
                      style={{ width: "100%", height: 32 }}
                    />
                  </Col>
                  <Col span={22}>
                    <Input
                      value={settings.general.primaryColor}
                      onChange={(e) => updateSettings("general", "primaryColor", e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>

        <TabPane tab="Notifications" key="notifications">
          <Card title="Email Notifications">
            <Form layout="vertical">
              <Form.Item>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onChange={(checked) => updateSettings("notifications", "emailNotifications", checked)}
                  />
                  <span style={{ marginLeft: 8 }}>Enable email notifications</span>
                </div>
              </Form.Item>

              <div style={{ marginLeft: 24 }}>
                <Form.Item>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Switch
                      checked={settings.notifications.formSubmissions}
                      onChange={(checked) => updateSettings("notifications", "formSubmissions", checked)}
                      disabled={!settings.notifications.emailNotifications}
                    />
                    <span style={{ marginLeft: 8, color: !settings.notifications.emailNotifications ? "#d9d9d9" : "" }}>
                      Form submissions
                    </span>
                  </div>
                </Form.Item>

                <Form.Item>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Switch
                      checked={settings.notifications.systemUpdates}
                      onChange={(checked) => updateSettings("notifications", "systemUpdates", checked)}
                      disabled={!settings.notifications.emailNotifications}
                    />
                    <span style={{ marginLeft: 8, color: !settings.notifications.emailNotifications ? "#d9d9d9" : "" }}>
                      System updates
                    </span>
                  </div>
                </Form.Item>

                <Form.Item>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Switch
                      checked={settings.notifications.marketingEmails}
                      onChange={(checked) => updateSettings("notifications", "marketingEmails", checked)}
                      disabled={!settings.notifications.emailNotifications}
                    />
                    <span style={{ marginLeft: 8, color: !settings.notifications.emailNotifications ? "#d9d9d9" : "" }}>
                      Marketing emails
                    </span>
                  </div>
                </Form.Item>
              </div>
            </Form>
          </Card>
        </TabPane>

        <TabPane tab="Security" key="security">
          <Card title="Security Settings">
            <Form layout="vertical">
              <Form.Item>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Switch
                    checked={settings.security.twoFactorAuth}
                    onChange={(checked) => updateSettings("security", "twoFactorAuth", checked)}
                  />
                  <span style={{ marginLeft: 8 }}>Enable two-factor authentication</span>
                </div>
              </Form.Item>

              <Form.Item label="Session Timeout (minutes)">
                <InputNumber
                  value={settings.security.sessionTimeout}
                  onChange={(value) => updateSettings("security", "sessionTimeout", value)}
                  min={1}
                  max={1440}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Switch
                    checked={settings.security.ipRestriction}
                    onChange={(checked) => updateSettings("security", "ipRestriction", checked)}
                  />
                  <span style={{ marginLeft: 8 }}>Enable IP restriction</span>
                </div>
              </Form.Item>

              <Form.Item label="Allowed IP Addresses (comma separated)">
                <TextArea
                  value={settings.security.allowedIPs}
                  onChange={(e) => updateSettings("security", "allowedIPs", e.target.value)}
                  disabled={!settings.security.ipRestriction}
                  placeholder="192.168.1.1, 10.0.0.1"
                  rows={4}
                />
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}
