import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import "./globals.css";
import "antd/dist/reset.css";

import ProgressBar from "./ProgressBar";
import theme from "./theme/theme";
const Providers = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <AntdRegistry>
        <ConfigProvider theme={theme}>
          {children}
          <ProgressBar />
        </ConfigProvider>
      </AntdRegistry>
    </body>
  </html>
);

export default Providers;
