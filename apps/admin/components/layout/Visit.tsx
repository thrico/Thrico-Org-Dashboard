import { Button, Dropdown, message, Tooltip } from "antd";
import React, { useState } from "react";
import { getCustomDomain, getThricoDomain } from "../../graphql/actions/domain";
import { MdDomainVerification } from "react-icons/md";
import {
  GlobalOutlined,
  ExportOutlined,
  CopyOutlined,
  LinkOutlined,
} from "@ant-design/icons";

const Visit = () => {
  const { data } = getThricoDomain();
  const { data: custom } = getCustomDomain();
  const [copied, setCopied] = useState(false);

  const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "thrico.community";

  const thricoDomainUrl = `https://${data?.getThricoDomain?.domain}.${NEXT_PUBLIC_SITE_URL}`;
  const customDomainUrl = custom?.getCustomDomain?.domain
    ? `https://${custom.getCustomDomain.domain}`
    : null;

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      message.success("URL copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      message.error("Failed to copy URL");
    }
  };

  const dropdownItems = [
    {
      key: "thrico-domain",
      label: (
        <div className="flex items-center justify-between min-w-[280px] p-2">
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">Thrico Domain</div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={thricoDomainUrl}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              {data?.getThricoDomain?.domain}.{NEXT_PUBLIC_SITE_URL}
            </a>
          </div>
          <div className="flex gap-1 ml-2">
            <Tooltip title="Copy URL">
              <Button
                type="text"
                size="small"
                icon={<CopyOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyUrl(thricoDomainUrl);
                }}
                className="text-gray-500 hover:text-blue-600"
              />
            </Tooltip>
            <Tooltip title="Open in new tab">
              <Button
                type="text"
                size="small"
                icon={<ExportOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(thricoDomainUrl, "_blank");
                }}
                className="text-gray-500 hover:text-blue-600"
              />
            </Tooltip>
          </div>
        </div>
      ),
      icon: <GlobalOutlined className="text-blue-500" />,
    },
  ];

  // Add custom domain if it exists
  if (customDomainUrl) {
    dropdownItems.push({
      key: "custom-domain",
      label: (
        <div className="flex items-center justify-between min-w-[280px] p-2">
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">Custom Domain</div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={customDomainUrl}
              className="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              {custom.getCustomDomain.domain}
            </a>
          </div>
          <div className="flex gap-1 ml-2">
            <Tooltip title="Copy URL">
              <Button
                type="text"
                size="small"
                icon={<CopyOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyUrl(customDomainUrl);
                }}
                className="text-gray-500 hover:text-green-600"
              />
            </Tooltip>
            <Tooltip title="Open in new tab">
              <Button
                type="text"
                size="small"
                icon={<ExportOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(customDomainUrl, "_blank");
                }}
                className="text-gray-500 hover:text-green-600"
              />
            </Tooltip>
          </div>
        </div>
      ),
      icon: <MdDomainVerification className="text-green-500" />,
    });
  }

  return (
    <Dropdown
      menu={{
        items: dropdownItems,
      }}
      placement="bottomRight"
      arrow
      trigger={["click"]}
    >
      <Tooltip title="Visit your website">
        <Button
          type="primary"
          icon={<LinkOutlined />}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 border-none hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Visit Site
        </Button>
      </Tooltip>
    </Dropdown>
  );
};

export default Visit;
