"use client";

import { useState, useEffect } from "react";
import {
  Table,
  Card,
  Tag,
  Button,
  Tabs,
  Modal,
  Form,
  Input,
  Select,
  message,
  Badge,
  Space,
  Statistic,
  Row,
  Col,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

interface ReportData {
  id: string;
  listingId: string;
  listingTitle: string;
  reportedBy: string;
  reason: string;
  description: string;
  status: string;
  date: string;
}

const Reports = () => {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isResolveModalVisible, setIsResolveModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [resolveForm] = Form.useForm();

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockData: ReportData[] = Array.from({ length: 20 }, (_, i) => {
      const statuses = ["pending", "resolved", "dismissed"];
      const reasons = [
        "Prohibited item",
        "Misleading description",
        "Counterfeit",
        "Inappropriate content",
        "Scam",
        "Wrong category",
      ];

      return {
        id: `${i + 1}`,
        listingId: `L${Math.floor(Math.random() * 1000) + 1}`,
        listingTitle: `Sample Listing ${Math.floor(Math.random() * 1000) + 1}`,
        reportedBy: `user${Math.floor(Math.random() * 100) + 1}@example.com`,
        reason: reasons[Math.floor(Math.random() * reasons.length)],
        description: `This is a report description for report #${i + 1}. The user has provided details about why they are reporting this listing.`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: new Date(
          Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
        )
          .toISOString()
          .split("T")[0],
      };
    });

    setReports(mockData);
  }, []);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const showViewModal = (report: ReportData) => {
    setSelectedReport(report);
    setIsViewModalVisible(true);
  };

  const showResolveModal = (report: ReportData) => {
    setSelectedReport(report);
    setIsResolveModalVisible(true);
    resolveForm.resetFields();
  };

  const handleResolve = (values: any) => {
    if (selectedReport) {
      // In a real app, call API to update the report status
      const updatedReports = reports.map((report) => {
        if (report.id === selectedReport.id) {
          return { ...report, status: values.action };
        }
        return report;
      });

      setReports(updatedReports);
      setIsResolveModalVisible(false);
      message.success(`Report ${selectedReport.id} has been ${values.action}`);
    }
  };

  const filteredReports =
    activeTab === "all"
      ? reports
      : reports.filter((report) => report.status === activeTab);

  const pendingCount = reports.filter(
    (report) => report.status === "pending"
  ).length;
  const resolvedCount = reports.filter(
    (report) => report.status === "resolved"
  ).length;
  const dismissedCount = reports.filter(
    (report) => report.status === "dismissed"
  ).length;

  const columns: ColumnsType<ReportData> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
    },
    {
      title: "Listing",
      dataIndex: "listingTitle",
      key: "listingTitle",
      render: (text, record) => <a>{`${text} (ID: ${record.listingId})`}</a>,
    },
    {
      title: "Reported By",
      dataIndex: "reportedBy",
      key: "reportedBy",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      filters: Array.from(new Set(reports.map((item) => item.reason))).map(
        (reason) => ({
          text: reason,
          value: reason,
        })
      ),
      onFilter: (value, record) => record.reason === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "gold";
        let icon = <ExclamationCircleOutlined />;

        if (status === "resolved") {
          color = "green";
          icon = <CheckCircleOutlined />;
        } else if (status === "dismissed") {
          color = "red";
          icon = <CloseCircleOutlined />;
        }

        return (
          <Tag color={color} icon={icon}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => showViewModal(record)}
          >
            View
          </Button>
          {record.status === "pending" && (
            <Button
              type="primary"
              size="small"
              onClick={() => showResolveModal(record)}
            >
              Resolve
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card title="Reports Management">
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Pending Reports"
              value={pendingCount}
              valueStyle={{ color: pendingCount > 0 ? "#faad14" : "#3f8600" }}
              prefix={<ExclamationCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Resolved Reports"
              value={resolvedCount}
              valueStyle={{ color: "#3f8600" }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Dismissed Reports"
              value={dismissedCount}
              valueStyle={{ color: "#cf1322" }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane
            tab={
              <span>
                All Reports{" "}
                <Badge count={reports.length} style={{ marginLeft: 8 }} />
              </span>
            }
            key="all"
          />
          <TabPane
            tab={
              <span>
                Pending{" "}
                <Badge
                  count={pendingCount}
                  style={{ backgroundColor: "#faad14", marginLeft: 8 }}
                />
              </span>
            }
            key="pending"
          />
          <TabPane
            tab={
              <span>
                Resolved{" "}
                <Badge
                  count={resolvedCount}
                  style={{ backgroundColor: "#52c41a", marginLeft: 8 }}
                />
              </span>
            }
            key="resolved"
          />
          <TabPane
            tab={
              <span>
                Dismissed{" "}
                <Badge
                  count={dismissedCount}
                  style={{ backgroundColor: "#f5222d", marginLeft: 8 }}
                />
              </span>
            }
            key="dismissed"
          />
        </Tabs>

        <Table
          columns={columns}
          dataSource={filteredReports}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="Report Details"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
            Close
          </Button>,
          selectedReport?.status === "pending" && (
            <Button
              key="resolve"
              type="primary"
              onClick={() => {
                setIsViewModalVisible(false);
                showResolveModal(selectedReport);
              }}
            >
              Resolve
            </Button>
          ),
        ]}
      >
        {selectedReport && (
          <div>
            <p>
              <strong>Report ID:</strong> {selectedReport.id}
            </p>
            <p>
              <strong>Listing:</strong> {selectedReport.listingTitle} (ID:{" "}
              {selectedReport.listingId})
            </p>
            <p>
              <strong>Reported By:</strong> {selectedReport.reportedBy}
            </p>
            <p>
              <strong>Reason:</strong> {selectedReport.reason}
            </p>
            <p>
              <strong>Date:</strong> {selectedReport.date}
            </p>
            <p>
              <strong>Status:</strong> {selectedReport.status.toUpperCase()}
            </p>
            <p>
              <strong>Description:</strong>
            </p>
            <p>{selectedReport.description}</p>
          </div>
        )}
      </Modal>

      <Modal
        title="Resolve Report"
        open={isResolveModalVisible}
        onCancel={() => setIsResolveModalVisible(false)}
        footer={null}
      >
        <Form
          form={resolveForm}
          layout="vertical"
          onFinish={handleResolve}
          initialValues={{ action: "resolved" }}
        >
          <Form.Item
            name="action"
            label="Action"
            rules={[{ required: true, message: "Please select an action" }]}
          >
            <Select>
              <Option value="resolved">Resolve (Remove Listing)</Option>
              <Option value="dismissed">Dismiss (Keep Listing)</Option>
            </Select>
          </Form.Item>

          <Form.Item name="notes" label="Notes">
            <TextArea rows={4} placeholder="Add notes about this resolution" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={() => setIsResolveModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Reports;
