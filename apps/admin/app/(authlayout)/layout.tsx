"use client";

import React, { useState } from "react";

import { Layout, Menu, theme } from "antd";
import { Navbar } from "../../components/layout/Header";
import Sidebar from "../../components/layout/sidebar/Sidebar";

import withAuth from "../../utils/withAuth";
import { getEntity, getGetUser } from "../../graphql/actions";
import KycForm from "../../screen/Kyc/Form";
import TrialBanner from "../../components/trail-banner/TrialBanner";
import NoSubscription from "../../screen/subscription/NoSubscription";
import { Button } from "@thrico/ui-components";
const { Header, Sider, Content } = Layout;

function RootLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);

  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const { data, loading } = getEntity();
  const {
    data: { getUser },
    loading: loadingUser,
  } = getGetUser();
  const check = data?.getEntity;

  return (
    <>
      {!loading && !loadingUser && (
        <>
          {check ? (
            <>
              <TrialBanner />
              <Layout>
                <Sider
                  style={{ height: "100vh" }}
                  trigger={null}
                  collapsible
                  collapsed={collapsed}
                >
                  <div className="demo-logo-vertical" />
                  <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                </Sider>
                <Layout>
                  {/* <Navbar /> */}

                  {!data?.getEntity?.subscription && (
                    <NoSubscription status="pending" />
                  )}

                  {data?.getEntity?.subscription?.status === "active" && (
                    <Content
                      style={{
                        minHeight: 280,
                        borderRadius: borderRadiusLG,
                      }}
                    >
                      {children}
                    </Content>
                  )}
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
