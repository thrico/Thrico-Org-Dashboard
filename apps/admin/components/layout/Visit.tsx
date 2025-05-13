import { Button, Dropdown } from "antd";
import React from "react";
import { getCustomDomain, getThricoDomain } from "../../graphql/actions/domain";
import { MdDomainVerification } from "react-icons/md";
import { GlobalOutlined } from "@ant-design/icons";

const Visit = () => {
  const { data } = getThricoDomain();
  const { data: custom } = getCustomDomain();
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "1",
            label: (
              <a
                target="_blank"
                href={`http://${data?.getThricoDomain?.domain}.
                ${process.env.NEXT_PUBLIC_SITE_URL}`}
              >
                http://{data?.getThricoDomain?.domain}.
                {process.env.NEXT_PUBLIC_SITE_URL}
              </a>
            ),

            icon: <GlobalOutlined />,
          },
        ],
      }}
    >
      <Button
        target="_blank"
        // href={`http://${data?.getEntity?.domain?.domain}.${process.env.NEXT_PUBLIC_SITE_URL}`}
        type="dashed"
      >
        Visit
      </Button>
    </Dropdown>
  );
};

export default Visit;
