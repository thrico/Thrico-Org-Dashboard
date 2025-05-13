"use client"

import { useState } from "react"
import {
  Typography,
  Button,
  Card,
  Form,
  Input,
  Select,
  Switch,
  Tabs,
  Space,
  Divider,
  Row,
  Col,
  Checkbox,
  Radio,
  DatePicker,
  Upload,
} from "antd"
import {
  ArrowLeftOutlined,
  SaveOutlined,
  FileTextOutlined,
  PlusOutlined,
  DeleteOutlined,
  DragOutlined,
  UploadOutlined,
} from "@ant-design/icons"
import Link from "next/link"

const { Title, Text } = Typography
const { TextArea } = Input
const { Option } = Select
const { TabPane } = Tabs

// Field type options
const fieldTypes = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "number", label: "Number" },
  { value: "textarea", label: "Text Area" },
  { value: "select", label: "Dropdown" },
  { value: "checkbox", label: "Checkbox" },
  { value: "radio", label: "Radio" },
  { value: "date", label: "Date" },
  { value: "file", label: "File Upload" },
]

// Initial form state
const initialForm = {
  name: "",
  description: "",
  fields: [
    {
      id: "field-1",
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
      options: [],
    },
  ],
  settings: {
    sendEmail: false,
    limitOneResponse: false,
  },
}

export default function CreateFormPage() {
  const [form, setForm] = useState(initialForm)
  const [activeTab, setActiveTab] = useState("editor")

  // Add a new field
  const addField = () => {
    const newField = {
      id: `field-${form.fields.length + 1}`,
      type: "text",
      label: `Field ${form.fields.length + 1}`,
      placeholder: "",
      required: false,
      options: [],
    }

    setForm({
      ...form,
      fields: [...form.fields, newField],
    })
  }

  // Remove a field
  const removeField = (id: string) => {
    setForm({
      ...form,
      fields: form.fields.filter((field) => field.id !== id),
    })
  }

  // Update field properties
  const updateField = (id: string, updates: any) => {
    setForm({
      ...form,
      fields: form.fields.map((field) => (field.id === id ? { ...field, ...updates } : field)),
    })
  }

  // Add option to select, checkbox, or radio field
  const addOption = (fieldId: string) => {
    setForm({
      ...form,
      fields: form.fields.map((field) => {
        if (field.id === fieldId) {
          const options = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`]
          return { ...field, options }
        }
        return field
      }),
    })
  }

  // Remove option from select, checkbox, or radio field
  const removeOption = (fieldId: string, optionIndex: number) => {
    setForm({
      ...form,
      fields: form.fields.map((field) => {
        if (field.id === fieldId && field.options) {
          const options = field.options.filter((_, index) => index !== optionIndex)
          return { ...field, options }
        }
        return field
      }),
    })
  }

  // Update option text
  const updateOption = (fieldId: string, optionIndex: number, value: string) => {
    setForm({
      ...form,
      fields: form.fields.map((field) => {
        if (field.id === fieldId && field.options) {
          const options = [...field.options]
          options[optionIndex] = value
          return { ...field, options }
        }
        return field
      }),
    })
  }

  // Update form settings
  const updateSettings = (key: string, value: boolean) => {
    setForm({
      ...form,
      settings: {
        ...form.settings,
        [key]: value,
      },
    })
  }

  // Save form (would connect to API in real implementation)
  const saveForm = (status: "draft" | "published") => {
    console.log("Saving form with status:", status, form)
    // In a real app, you would save to your backend here
    alert(`Form ${status === "published" ? "published" : "saved as draft"} successfully!`)
  }

  // Render field preview based on type
  const renderFieldPreview = (field: any) => {
    switch (field.type) {
      case "text":
        return <Input placeholder={field.placeholder || ""} disabled />
      case "email":
        return <Input type="email" placeholder={field.placeholder || ""} disabled />
      case "number":
        return <Input type="number" placeholder={field.placeholder || ""} disabled />
      case "textarea":
        return <TextArea placeholder={field.placeholder || ""} disabled />
      case "select":
        return (
          <Select placeholder={field.placeholder || "Select an option"} style={{ width: "100%" }} disabled>
            {field.options?.map((option: string, index: number) => (
              <Option key={index} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        )
      case "checkbox":
        return (
          <div>
            {field.options?.map((option: string, index: number) => (
              <div key={index} style={{ marginBottom: 8 }}>
                <Checkbox disabled>{option}</Checkbox>
              </div>
            ))}
          </div>
        )
      case "radio":
        return (
          <Radio.Group disabled>
            {field.options?.map((option: string, index: number) => (
              <div key={index} style={{ marginBottom: 8 }}>
                <Radio value={option}>{option}</Radio>
              </div>
            ))}
          </Radio.Group>
        )
      case "date":
        return <DatePicker style={{ width: "100%" }} disabled />
      case "file":
        return (
          <Upload disabled>
            <Button icon={<UploadOutlined />} disabled>
              Click to Upload
            </Button>
          </Upload>
        )
      default:
        return <Input disabled />
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Space>
          <Button type="text" icon={<ArrowLeftOutlined />}>
            <Link href="/forms">Back</Link>
          </Button>
          <Title level={2} style={{ margin: 0 }}>
            Create Form
          </Title>
        </Space>

        <Space>
          <Button icon={<SaveOutlined />} onClick={() => saveForm("draft")}>
            Save as Draft
          </Button>
          <Button type="primary" icon={<FileTextOutlined />} onClick={() => saveForm("published")}>
            Publish Form
          </Button>
        </Space>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Form Editor" key="editor">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Card title="Form Details">
              <Form layout="vertical">
                <Form.Item label="Form Name">
                  <Input
                    placeholder="Enter form name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </Form.Item>
                <Form.Item label="Description">
                  <TextArea
                    placeholder="Enter form description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={4}
                  />
                </Form.Item>
              </Form>
            </Card>

            <Card title="Form Fields">
              <Space direction="vertical" style={{ width: "100%" }}>
                {form.fields.map((field, index) => (
                  <Card
                    key={field.id}
                    style={{ marginBottom: 16 }}
                    title={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <DragOutlined style={{ marginRight: 8, cursor: "move" }} />
                        <span>Field {index + 1}</span>
                      </div>
                    }
                    extra={
                      <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeField(field.id)} />
                    }
                  >
                    <Form layout="vertical">
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="Field Label">
                            <Input
                              value={field.label}
                              onChange={(e) => updateField(field.id, { label: e.target.value })}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Field Type">
                            <Select
                              value={field.type}
                              style={{ width: "100%" }}
                              onChange={(value) =>
                                updateField(field.id, {
                                  type: value,
                                  options: ["select", "checkbox", "radio"].includes(value) ? ["Option 1"] : [],
                                })
                              }
                            >
                              {fieldTypes.map((type) => (
                                <Option key={type.value} value={type.value}>
                                  {type.label}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="Placeholder">
                            <Input
                              value={field.placeholder || ""}
                              onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label=" " style={{ marginTop: 8 }}>
                            <Switch
                              checked={field.required}
                              onChange={(checked) => updateField(field.id, { required: checked })}
                            />
                            <span style={{ marginLeft: 8 }}>Required field</span>
                          </Form.Item>
                        </Col>
                      </Row>

                      {/* Options for select, checkbox, or radio fields */}
                      {["select", "checkbox", "radio"].includes(field.type) && (
                        <div>
                          <Divider orientation="left">Options</Divider>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                            <Text>Options</Text>
                            <Button
                              type="primary"
                              size="small"
                              icon={<PlusOutlined />}
                              onClick={() => addOption(field.id)}
                            >
                              Add Option
                            </Button>
                          </div>

                          <Space direction="vertical" style={{ width: "100%" }}>
                            {field.options?.map((option: string, optionIndex: number) => (
                              <div key={optionIndex} style={{ display: "flex", gap: 8 }}>
                                <Input
                                  value={option}
                                  onChange={(e) => updateOption(field.id, optionIndex, e.target.value)}
                                  placeholder={`Option ${optionIndex + 1}`}
                                />
                                <Button
                                  type="text"
                                  danger
                                  icon={<DeleteOutlined />}
                                  onClick={() => removeOption(field.id, optionIndex)}
                                  disabled={field.options?.length === 1}
                                />
                              </div>
                            ))}
                          </Space>
                        </div>
                      )}
                    </Form>
                  </Card>
                ))}

                <Button type="dashed" icon={<PlusOutlined />} onClick={addField} style={{ width: "100%" }}>
                  Add Field
                </Button>
              </Space>
            </Card>

            <Card title="Form Settings">
              <Form layout="vertical">
                <Form.Item>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Switch
                      checked={form.settings.sendEmail}
                      onChange={(checked) => updateSettings("sendEmail", checked)}
                    />
                    <span style={{ marginLeft: 8 }}>Send responses via email</span>
                  </div>
                </Form.Item>

                <Form.Item>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Switch
                      checked={form.settings.limitOneResponse}
                      onChange={(checked) => updateSettings("limitOneResponse", checked)}
                    />
                    <span style={{ marginLeft: 8 }}>Limit to one response per user</span>
                  </div>
                </Form.Item>
              </Form>
            </Card>
          </Space>
        </TabPane>

        <TabPane tab="Preview" key="preview">
          <Card>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              {form.name ? (
                <Title level={2}>{form.name}</Title>
              ) : (
                <Title level={2} type="secondary">
                  Form Name
                </Title>
              )}

              {form.description ? (
                <Text type="secondary" style={{ marginBottom: 24, display: "block" }}>
                  {form.description}
                </Text>
              ) : (
                <Text type="secondary" style={{ marginBottom: 24, display: "block" }}>
                  Form description will appear here
                </Text>
              )}

              <Form layout="vertical">
                {form.fields.map((field) => (
                  <Form.Item
                    key={field.id}
                    label={
                      <span>
                        {field.label}
                        {field.required && <span style={{ color: "#ff4d4f", marginLeft: 4 }}>*</span>}
                      </span>
                    }
                  >
                    {renderFieldPreview(field)}
                  </Form.Item>
                ))}

                <Form.Item>
                  <Button type="primary" disabled>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}
