import { Card, Col, Row, Typography } from 'antd'
const { Title, Text, Paragraph } = Typography


import React from 'react'

interface PageType {
    type: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

function SelectPage({ pageTypes, onSelect }: { pageTypes: PageType[]; onSelect: (type: string) => void }) {
    return (
        <div style={{ padding: "20px 0" }}>
            <Title level={2} style={{ textAlign: "center", marginBottom: 20 }}>
                Create a Page to elevate
            </Title>
            <Paragraph style={{ textAlign: "center", fontSize: 16, marginBottom: 40 }}>
                Create a professional page to showcase your organization, connect with your audience, and grow your presence. Select a page type to begin.
            </Paragraph>

            <Row gutter={[16, 16]} justify="center">
                {pageTypes.map((page) => (
                    <Col xs={24} sm={12} md={8} lg={4} key={page.type + page.title}>
                        <Card
                            hoverable
                            style={{ textAlign: "center", height: "100%" }}
                            onClick={() => onSelect(page.type)}
                        >
                            <div style={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {page.icon}
                            </div>
                            <Title level={4}>{page.title}</Title>
                            <Text>{page.description}</Text>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default SelectPage