"use client";

import React, { useState } from "react";

import { Button, Layout, Menu, theme } from "antd";
import { Navbar } from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import Footer from "../../components/layout/Footer";
import withAuth from "../../utils/withAuth";
import { getEntity, getGetUser } from "../../graphql/actions";
import KycForm from "../../screen/Kyc/Form";
import TrialBanner from "../../components/trail-banner/TrialBanner";

const { Header, Sider, Content } = Layout;

function RootLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { data, loading } = getEntity();
  const {
    data: { getUser },
    loading: loadingUser,
  } = getGetUser();
  const check = data?.getEntity;
  console.log(check);
  return (
    <>
      {!loading && !loadingUser && (
        <>
          {check ? (
            <>
              <TrialBanner />
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
              </Layout>
            </>
          ) : (
            <KycForm entity={data?.getEntity} user={getUser} />
          )}
        </>
      )}
    </>
  );
}

export default withAuth(RootLayout);
