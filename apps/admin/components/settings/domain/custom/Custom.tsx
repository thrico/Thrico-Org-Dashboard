import { Card, List, Space, Tag } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { getCustomDomain } from "../../../../graphql/actions/domain";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const Custom = () => {
  const router = useRouter();
  const { data, loading } = getCustomDomain();
  return (
    <>
      {data?.getCustomDomain?.id && (
        <Card
          style={{ marginTop: 10 }}
          onClick={() =>
            router.push(`/settings/domains/${data?.getCustomDomain?.id}`)
          }
          hoverable
        >
          <List.Item
            extra={
              data?.getCustomDomain?.isVerified ? (
                <Tag color="success" icon={<CheckCircleOutlined />}></Tag>
              ) : (
                <Tag color="warning">Need setup</Tag>
              )
            }
          >
            <List.Item.Meta
              avatar={<BsGlobeCentralSouthAsia size={20} />}
              title={
                <Space>
                  {data?.getCustomDomain.domain}
                  {data?.getCustomDomain?.isVerified ? (
                    <>
                      <Tag
                        icon={<CheckCircleOutlined />}
                        color="success"
                        style={{ marginLeft: "10px" }}
                      >
                        Verified
                      </Tag>
                    </>
                  ) : (
                    <Tag
                      icon={<CloseCircleOutlined />}
                      color="error"
                      style={{ marginLeft: "10px" }}
                    >
                      Not Verified
                    </Tag>
                  )}
                </Space>
              }
              description={"Primary"}
            />
            <Space style={{ marginRight: 10 }}>{/* <DomainChange /> */}</Space>
          </List.Item>
        </Card>
      )}
    </>
  );
};

export default Custom;
