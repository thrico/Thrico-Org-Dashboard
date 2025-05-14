import Providers from "@repo/ui/Providers";
import { ApolloWrapper } from "../hoc/ApolloWrapper";
import "react-quill/dist/quill.snow.css";
import "./global.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { ConfigProvider } from "antd";
import { workSans } from "./font";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <ApolloWrapper host={process.env.NEXT_PUBLIC_API_URL}>
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
                colorPrimary: "#000000",
                borderRadius: 2,
                fontFamily: "'Work Sans', sans-serif;",
              },
            }}
          >
            {children}
          </ConfigProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
