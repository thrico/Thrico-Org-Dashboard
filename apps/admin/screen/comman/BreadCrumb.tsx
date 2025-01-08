import React from "react";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  HomeOutlined,
  LeftCircleOutlined,
  LeftCircleTwoTone,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const MainBreadcrumb = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let path;
  path = pathname.split("/").filter((set) => set !== "");

  const value = searchParams.get("name");
  const tab = searchParams.get("tab");
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {path.length !== 0 && (
        <>
          <LeftCircleOutlined
            color={colorPrimary}
            onClick={() => router.back()}
            style={{
              fontSize: "1.3rem",
              marginRight: "1rem",
              cursor: "pointer",
            }}
          />
          <Breadcrumb.Item>
            <HomeOutlined />
          </Breadcrumb.Item>
        </>
      )}

      {path.map((t, index) => (
        <>
          {path.length === index + 1 ? (
            <>
              {value ? (
                <Breadcrumb.Item>
                  <span style={{ textTransform: "capitalize" }}> {value}</span>
                </Breadcrumb.Item>
              ) : (
                <Breadcrumb.Item>
                  <span style={{ textTransform: "capitalize" }}>
                    {" "}
                    {t.replace("_", " ")}
                  </span>
                </Breadcrumb.Item>
              )}
              {tab && (
                <Breadcrumb.Item>
                  <span style={{ textTransform: "capitalize" }}>
                    {tab.replaceAll("-", " ")}
                  </span>
                </Breadcrumb.Item>
              )}
            </>
          ) : (
            <Breadcrumb.Item>
              <span style={{ textTransform: "capitalize" }}> {t}</span>
            </Breadcrumb.Item>
          )}
        </>
      ))}
    </Breadcrumb>
  );
};

export default MainBreadcrumb;
