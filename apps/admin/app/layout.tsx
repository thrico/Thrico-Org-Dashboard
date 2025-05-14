import Providers from "@repo/ui/Providers";
import { ApolloWrapper } from "../hoc/ApolloWrapper";
import "react-quill/dist/quill.snow.css";
import "./global.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { ConfigProvider } from "antd";
import { workSans } from "./font";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "antd/dist/reset.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ApolloWrapper host={process.env.NEXT_PUBLIC_API_URL}>
        <body className={workSans.className}>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                components: {
                  Card: {
                    headerFontSize: 30,
                    headerHeight: 70,
                  },
                  Menu: {
                    colorItemBgSelected: "#eeeeee",
                  },
                  Modal: {
                    titleFontSize: 20,
                  },
                },

                token: {
                  // Ensuring font className usage

                  borderRadius: 20,
                  colorPrimary: "#000000",
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
