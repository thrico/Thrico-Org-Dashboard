import Providers from "@repo/ui/Providers";
import { ApolloWrapper } from "../hoc/ApolloWrapper";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Thrico Dashboard",
  description: "Thrico Dashboard",
};
import "@react-page/editor/lib/index.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ApolloWrapper host={"http://localhost:1111"}>
            {children}
          </ApolloWrapper>
        </Providers>
      </body>
    </html>
  );
}
