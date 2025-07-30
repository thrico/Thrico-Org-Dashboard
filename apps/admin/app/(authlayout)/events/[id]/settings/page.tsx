"use client";

import { useState } from "react";
import {
  Typography,
  Card,
  Input,
  Select,
  Switch,
  Button,
  Collapse,
  Divider,
  Space,
  Tooltip,
  Popover,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

function EventSettings() {
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("pst");
  const [retention, setRetention] = useState("1year");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Title level={4}>Settings</Title>
      </div>

      <Card title="Advanced Settings">
        <Collapse accordion>
          <Panel header="Danger Zone" key="danger-zone">
            <div className="rounded-md border border-red-300 p-4 bg-red-50">
              <Text strong className="text-red-600">
                Delete Event
              </Text>
              <p className="mt-1 text-sm text-gray-500">
                Once you delete an event, there is no going back. This action
                cannot be undone.
              </p>
              <Popover
                title="Are you sure?"
                content={
                  <div>
                    <p>This action cannot be undone.</p>
                    <Button danger type="primary" icon={<DeleteOutlined />}>
                      Confirm Delete
                    </Button>
                  </div>
                }
                trigger="click"
              >
                <Button danger icon={<DeleteOutlined />} className="mt-4">
                  Delete Event
                </Button>
              </Popover>
            </div>
          </Panel>
        </Collapse>
      </Card>
    </div>
  );
}

export default EventSettings;
