"use client";

import { useState, useMemo } from "react";
import {
  Select,
  Card,
  Typography,
  Tag,
  Layout,
  Space,
  Empty,
  Button,
} from "antd";

const { Title, Text, Paragraph } = Typography;
const { Header, Content } = Layout;
const { Option } = Select;
import fontData from "../../../json/font.json"; // Adjust the path as necessary
// Sample font data - in a real app, this would be fetched from an API

export function FontDashboard() {
  const [selectedFont, setSelectedFont] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  // Get all font names
  const allFontNames = Object.keys(fontData);

  // Get initial font options (limited to 5)
  const initialFontOptions = useMemo(() => {
    return allFontNames.slice(0, 5).map((font) => ({
      value: font,
      label: font,
    }));
  }, []);

  // Filter fonts based on search input
  const filteredFontOptions = useMemo(() => {
    if (!searchValue) return initialFontOptions;

    return allFontNames
      .filter((font) => font.toLowerCase().includes(searchValue.toLowerCase()))
      .map((font) => ({
        value: font,
        label: font,
      }));
  }, [searchValue, initialFontOptions]);

  // Handle font selection
  const handleFontChange = (value: string) => {
    setSelectedFont(value);
  };

  // Handle search input change
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <Card
      extra={<Button type="primary">Update</Button>}
      title="Font Dashboard"
      style={{ width: "100%", margin: "24px" }}
    >
      {/* Font Selection Panel */}
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card>
          <Title level={4}>Fonts</Title>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Search fonts..."
            optionFilterProp="children"
            onChange={handleFontChange}
            onSearch={handleSearch}
            filterOption={false}
            defaultActiveFirstOption={false}
            notFoundContent={<Empty description="No matching fonts" />}
            options={filteredFontOptions}
          />
          <Text
            type="secondary"
            style={{ display: "block", marginTop: "8px", fontSize: "12px" }}
          >
            {searchValue
              ? `Showing matching results`
              : `Showing 5 of ${allFontNames.length} fonts`}
          </Text>
        </Card>

        {/* Font Details Panel */}
        <Card>
          <Title level={4}>Font Details</Title>
          {selectedFont ? (
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div>
                <Title level={4}>{selectedFont}</Title>
                <Paragraph
                  style={{ fontSize: "24px", fontFamily: selectedFont }}
                >
                  The quick brown fox jumps over the lazy dog
                </Paragraph>
              </div>

              <div>
                <Text type="secondary">Available Weights</Text>
                <div style={{ marginTop: "8px" }}>
                  {fontData[selectedFont as keyof typeof fontData].weights.map(
                    (weight) => (
                      <Tag key={weight} style={{ marginBottom: "8px" }}>
                        {weight}
                      </Tag>
                    )
                  )}
                </div>
              </div>

              <div>
                <Text type="secondary">Available Styles</Text>
                <div style={{ marginTop: "8px" }}>
                  {fontData[selectedFont as keyof typeof fontData].styles.map(
                    (style) => (
                      <Tag key={style} style={{ marginBottom: "8px" }}>
                        {style}
                      </Tag>
                    )
                  )}
                </div>
              </div>

              <div>
                <Text type="secondary">Supported Subsets</Text>
                <div style={{ marginTop: "8px" }}>
                  {fontData[selectedFont as keyof typeof fontData].subsets.map(
                    (subset) => (
                      <Tag key={subset} style={{ marginBottom: "8px" }}>
                        {subset}
                      </Tag>
                    )
                  )}
                </div>
              </div>
            </Space>
          ) : (
            <Empty description="Select a font to view details" />
          )}
        </Card>
      </Space>
    </Card>
  );
}
