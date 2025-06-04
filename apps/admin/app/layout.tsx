// app/layout.tsx or app/RootLayout.tsx
"use client";

import Providers from "@thrico/ui/Providers";
import { ApolloWrapper } from "../hoc/ApolloWrapper";
import "react-quill/dist/quill.snow.css";
import "./global.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { ConfigProvider } from "antd";
import { workSans } from "./font";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "antd/dist/reset.css";
import { useThemeStore } from "../store/themeStore";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { primaryColor, fontSize, borderRadius, Button } = useThemeStore();

  return (
    <html lang="en">
      <ApolloWrapper host={process.env.NEXT_PUBLIC_API_URL}>
        <body className={workSans.className}>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                components: {
                  Card: {
                    headerFontSize: 18,
                    headerHeight: 50,
                  },
                  Menu: {
                    colorItemBgSelected: "#eeeeee",
                  },
                  Modal: {
                    titleFontSize: 20,
                  },
                  // Button: {
                  //   ...Button,
                  // },
                },
                token: {
                  colorPrimary: primaryColor,
                  fontSize: Number(fontSize),
                  borderRadius: Number(borderRadius),
                  fontSizeHeading1: 30,
                  fontSizeHeading2: 24,
                  fontSizeHeading3: 20,
                  fontSizeHeading4: 16,
                  fontSizeHeading5: 14,
                },
              }}
            >
              <Providers>{children}</Providers>
            </ConfigProvider>
          </AntdRegistry>
        </body>
      </ApolloWrapper>
    </html>
  );
}
