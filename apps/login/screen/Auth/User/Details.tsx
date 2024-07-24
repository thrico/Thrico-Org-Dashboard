import { Flex, Card, Typography } from "antd";
import React, { useState } from "react";
import { getUser, userProfile } from "../../../components/graphql/actions";
import { useTokenStore } from "../../../components/store/store";
import {
  AppstoreAddOutlined,
  DashOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Logout from "@repo/ui/Logout";
import { useRouter } from "next/navigation";

const Details = ({ }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    router.push("/logout");
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { Title, Paragraph, Text } = Typography;
  return (
    <Flex gap={"1rem"} vertical style={{ width: "100%" }}>
      <Card>
        {process.env.DASHBOARD_URL}
        <Link href={process.env.NEXT_PUBLIC_DASHBOARD_URL ? process.env.NEXT_PUBLIC_DASHBOARD_URL : "/"}>
          <Flex align="center">
            <AppstoreAddOutlined style={{ fontSize: 20 }} />
            <Typography style={{ marginLeft: 20, marginBottom: 0 }}>
              View Dashboard
            </Typography>
          </Flex>
        </Link>
      </Card>

      <Card>
        <Link href="#">
          <Flex align="center">
            <SettingOutlined style={{ fontSize: 20 }} />
            <Typography style={{ marginLeft: 20, marginBottom: 0 }}>
              Manage Settings
            </Typography>
          </Flex>
        </Link>
      </Card>

      <Card>
        <Link href="#">
          <Flex onClick={showModal} align="center">
            <LogoutOutlined style={{ fontSize: 20 }} />
            <Typography style={{ marginLeft: 20, marginBottom: 0 }}>
              Logout
            </Typography>
          </Flex>
        </Link>
      </Card>
      <Logout open={open} handleOk={handleOk} handleCancel={handleCancel} />
    </Flex>
  );
};

export default Details;
