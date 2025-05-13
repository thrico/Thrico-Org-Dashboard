"use client"

import { useState, useEffect } from "react"
import { Table, Tag, Button, Input, Space, Select, Dropdown, Menu, message, Modal, Tabs } from "antd"
import {
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
  EllipsisOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  StopOutlined,
  PauseCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import { useRouter } from "next/navigation"

const { TabPane } = Tabs

interface ListingData {
  id: string
  title: string
  category: string
  condition: string
  price: number
  status: string
  seller: string
  views: number
  likes: number
  date: string
}

const AllListings = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [searchText, setSearchText] = useState("")
  const [listingData, setListingData] = useState<ListingData[]>([])
  const [filteredData, setFilteredData] = useState<ListingData[]>([])
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [selectedListing, setSelectedListing] = useState<string | null>(null)

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockData: ListingData[] = Array.from({ length: 30 }, (_, i) => {
      const statuses = ["approved", "pending", "blocked", "inactive"]
      const categories = ["Vehicles", "Electronics", "Real Estate", "Furniture", "Clothing", "Services"]
      const conditions = ["New", "Used", "Refurbished", "For parts"]
      const sellers = ["John Doe", "Jane Smith", "Robert Johnson", "Emily Davis", "Michael Wilson"]

      return {
        id: `${i + 1}`,
        title: `Sample Listing ${i + 1}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        price: Math.floor(Math.random() * 10000) + 100,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        seller: sellers[Math.floor(Math.random() * sellers.length)],
        views: Math.floor(Math.random() * 5000),
        likes: Math.floor(Math.random() * 500),
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      }
    })

    setListingData(mockData)
    setFilteredData(mockData)
  }, [])

  useEffect(() => {
    let filtered = [...listingData]

    // Filter by search text
    if (searchText) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchText.toLowerCase()) ||
          item.seller.toLowerCase().includes(searchText.toLowerCase()) ||
          item.category.toLowerCase().includes(searchText.toLowerCase()),
      )
    }

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter((item) => item.status === activeTab)
    }

    setFilteredData(filtered)
  }, [searchText, activeTab, listingData])

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const handleTabChange = (key: string) => {
    setActiveTab(key)
  }

  const handleViewListing = (id: string) => {
    message.info(`Viewing listing ${id}`)
    // In a real app, navigate to the listing detail page
  }

  const handleEditListing = (id: string) => {
    message.info(`Editing listing ${id}`)
    // In a real app, navigate to the edit listing page
  }

  const showDeleteModal = (id: string) => {
    setSelectedListing(id)
    setIsDeleteModalVisible(true)
  }

  const handleDeleteListing = () => {
    if (selectedListing) {
      // In a real app, call API to delete the listing
      setListingData(listingData.filter((item) => item.id !== selectedListing))
      message.success(`Listing ${selectedListing} has been deleted`)
      setIsDeleteModalVisible(false)
      setSelectedListing(null)
    }
  }

  const handleStatusChange = (id: string, newStatus: string) => {
    // In a real app, call API to update the listing status
    const updatedData = listingData.map((item) => {
      if (item.id === id) {
        return { ...item, status: newStatus }
      }
      return item
    })

    setListingData(updatedData)
    message.success(`Listing ${id} status changed to ${newStatus.toUpperCase()}`)
  }

  const columns: ColumnsType<ListingData> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => <a onClick={() => handleViewListing(record.id)}>{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: Array.from(new Set(listingData.map((item) => item.category))).map((category) => ({
        text: category,
        value: category,
      })),
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Condition",
      dataIndex: "condition",
      key: "condition",
      filters: Array.from(new Set(listingData.map((item) => item.condition))).map((condition) => ({
        text: condition,
        value: condition,
      })),
      onFilter: (value, record) => record.condition === value,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toLocaleString()}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Seller",
      dataIndex: "seller",
      key: "seller",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "green"
        let icon = <CheckCircleOutlined />

        if (status === "pending") {
          color = "gold"
          icon = <ClockCircleOutlined />
        } else if (status === "blocked") {
          color = "red"
          icon = <StopOutlined />
        } else if (status === "inactive") {
          color = "gray"
          icon = <PauseCircleOutlined />
        }

        return (
          <Tag color={color} icon={icon}>
            {status.toUpperCase()}
          </Tag>
        )
      },
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
      sorter: (a, b) => a.views - b.views,
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "likes",
      sorter: (a, b) => a.likes - b.likes,
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
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="view" icon={<EyeOutlined />} onClick={() => handleViewListing(record.id)}>
                View
              </Menu.Item>
              <Menu.Item key="edit" icon={<EditOutlined />} onClick={() => handleEditListing(record.id)}>
                Edit
              </Menu.Item>
              <Menu.Divider />
              {record.status !== "approved" && (
                <Menu.Item
                  key="approve"
                  icon={<CheckCircleOutlined />}
                  onClick={() => handleStatusChange(record.id, "approved")}
                >
                  Approve
                </Menu.Item>
              )}
              {record.status !== "pending" && (
                <Menu.Item
                  key="pending"
                  icon={<ClockCircleOutlined />}
                  onClick={() => handleStatusChange(record.id, "pending")}
                >
                  Mark as Pending
                </Menu.Item>
              )}
              {record.status !== "blocked" && (
                <Menu.Item key="block" icon={<StopOutlined />} onClick={() => handleStatusChange(record.id, "blocked")}>
                  Block
                </Menu.Item>
              )}
              {record.status !== "inactive" && (
                <Menu.Item
                  key="inactive"
                  icon={<PauseCircleOutlined />}
                  onClick={() => handleStatusChange(record.id, "inactive")}
                >
                  Mark as Inactive
                </Menu.Item>
              )}
              <Menu.Divider />
              <Menu.Item key="delete" icon={<DeleteOutlined />} danger onClick={() => showDeleteModal(record.id)}>
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ]

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Marketplace Listings</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => router.push("/add-listing")}>
          Add New Listing
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Space>
          <Input
            placeholder="Search listings..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
          />
          <Select
            placeholder="Category"
            style={{ width: 150 }}
            allowClear
            options={Array.from(new Set(listingData.map((item) => item.category))).map((category) => ({
              label: category,
              value: category,
            }))}
          />
          <Select
            placeholder="Condition"
            style={{ width: 150 }}
            allowClear
            options={Array.from(new Set(listingData.map((item) => item.condition))).map((condition) => ({
              label: condition,
              value: condition,
            }))}
          />
          <Button icon={<FilterOutlined />}>More Filters</Button>
        </Space>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab={`All Listings (${listingData.length})`} key="all" />
        <TabPane tab={`Approved (${listingData.filter((item) => item.status === "approved").length})`} key="approved" />
        <TabPane tab={`Pending (${listingData.filter((item) => item.status === "pending").length})`} key="pending" />
        <TabPane tab={`Blocked (${listingData.filter((item) => item.status === "blocked").length})`} key="blocked" />
        <TabPane tab={`Inactive (${listingData.filter((item) => item.status === "inactive").length})`} key="inactive" />
      </Tabs>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1300 }}
      />

      <Modal
        title="Delete Listing"
        open={isDeleteModalVisible}
        onOk={handleDeleteListing}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this listing? This action cannot be undone.</p>
      </Modal>
    </div>
  )
}

export default AllListings
