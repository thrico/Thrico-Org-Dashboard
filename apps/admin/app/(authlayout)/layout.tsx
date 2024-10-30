"use client";

import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Navbar } from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import Footer from "../../components/layout/Footer";
import withAuth from "../../utils/withAuth";
import { getEntity } from "../../graphql/actions";
import KycForm from "../../screen/Kyc/Form";
const { Header, Sider, Content } = Layout;

function RootLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { data, loading } = getEntity();
  const check = data?.getEntity?.entity;
  return (
    <>
      {!loading && (
        <>
          {check ? (
            <Layout>
              <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
              </Sider>
              <Layout>
                <Navbar />

                <Content
                  style={{
                    margin: "24px 16px",
                    padding: 24,
                    minHeight: 280,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  {children}
                </Content>
              </Layout>
              <Footer />
            </Layout>
          ) : (
            <KycForm data={data} />
          )}
        </>
      )}
    </>
  );
}

export default withAuth(RootLayout);
