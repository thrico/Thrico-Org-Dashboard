import React, { useState } from "react";
import { Button, Drawer, Space } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EllipsisOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  changeUserStatus,
  getUserDetailsById,
} from "../../../graphql/actions/user";
import UserInfo from "./UserInfo";
import UserKyc from "./UserKyc";
import { usePathname } from "next/navigation";
import { PiDotsThreeOutline } from "react-icons/pi";
import { useRouter } from "next/navigation";
const ApproveUser = ({ id, onClose, open }: { id: string }) => {
  const pathname = usePathname();

  const router = useRouter();
  const [change, { loading: btnLoading }] = changeUserStatus({
    id,
    active: pathname?.replaceAll("/user/", ""),
    router,
  });
  const { data, loading } = getUserDetailsById({
    variables: {
      input: {
        id,
      },
    },
  });

  const changeStatus = (value: String) => {
    change({
      variables: {
        input: {
          status: value,
          id: id,
        },
      },
    });
  };

  return (
    <>
      <Drawer
        extra={
          <>
            {!loading && (
              <Space>
                {data?.getUserDetailsById?.status === "PENDING" && (
                  <>
                    <Button
                      loading={btnLoading}
                      onClick={() => changeStatus("BLOCKED")}
                      danger
                      icon={<StopOutlined />}
                    >
                      Block
                    </Button>
                    <Button
                      loading={btnLoading}
                      onClick={() => changeStatus("REJECTED")}
                      icon={<CloseCircleOutlined />}
                    >
                      Reject
                    </Button>
                    <Button
                      loading={btnLoading}
                      onClick={() => changeStatus("APPROVED")}
                      icon={<CheckCircleOutlined />}
                      type="primary"
                    >
                      Approve
                    </Button>
                  </>
                )}
                {data?.getUserDetailsById?.status === "APPROVED" && (
                  <>
                    <Button
                      loading={btnLoading}
                      onClick={() => changeStatus("BLOCKED")}
                      danger
                      icon={<StopOutlined />}
                    >
                      Blocked
                    </Button>
                  </>
                )}

                {data?.getUserDetailsById?.status === "BLOCKED" && (
                  <>
                    <Button
                      loading={btnLoading}
                      onClick={() => changeStatus("APPROVED")}
                      icon={<CheckCircleOutlined />}
                      type="primary"
                    >
                      Un Blocked
                    </Button>
                  </>
                )}
                {data?.getUserDetailsById?.status === "REJECTED" && (
                  <>
                    <Button
                      loading={btnLoading}
                      onClick={() => changeStatus("BLOCKED")}
                      danger
                      icon={<StopOutlined />}
                    >
                      Block
                    </Button>
                    <Button
                      loading={btnLoading}
                      onClick={() => changeStatus("APPROVED")}
                      icon={<CheckCircleOutlined />}
                      type="primary"
                    >
                      APPROVE
                    </Button>
                  </>
                )}
              </Space>
            )}
          </>
        }
        width={1000}
        title="User Details"
        onClose={onClose}
        open={open}
      >
        <Space direction="vertical" style={{ gap: 20 }}>
          <UserInfo data={data?.getUserDetailsById?.user} />

          <UserKyc data={data?.getUserDetailsById?.userKyc} />
        </Space>
      </Drawer>
    </>
  );
};

export default ApproveUser;
