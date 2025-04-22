"use client"

import { useState } from "react"
import { Button, Modal, Input, Form, Typography, Row, Col } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import Search from "antd/es/input/Search"

const { Title, Paragraph } = Typography

export default function DomainChange() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log("Form values:", values)
      setIsModalOpen(false)
      form.resetFields()
    })
  }

  const modalTitle = (
    <Row justify="space-between" align="middle">
      <Col>
        <Title level={4} style={{ margin: 0 }}>
          Change to a new thrico.community domain
        </Title>
      </Col>
      <Col>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={handleCancel}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        />
      </Col>
    </Row>
  )

  return (
    <div style={{ padding: 24 }}>

      <Button type="link" onClick={showModal} >
        Change to a new  domain
      </Button>


      <Modal
        title={modalTitle}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
        style={{ top: 20 }}
        closeIcon={null}
      >
        <div style={{ paddingTop: 16, paddingBottom: 16 }}>
          <Paragraph style={{ fontSize: 16, marginBottom: 24 }}>
            You can only change this domain name once. Your original thrico.community domain will still be visible in your
            admin. There is no cost to make this change.
          </Paragraph>

          <Form form={form} layout="vertical">
            <Search

              addonBefore="https://"
              suffix=".thrico.community"

              enterKeyHint="go"
            />


          </Form>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 24,
            paddingTop: 16,
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Button onClick={handleCancel} size="large">
            Cancel
          </Button>
          <Button type="primary" onClick={handleSubmit} size="large">
            Add domain
          </Button>
        </div>
      </Modal>
    </div>
  )
}
