import Providers from "@repo/ui/Providers";
import { ApolloWrapper } from "../hoc/ApolloWrapper";
import "react-quill/dist/quill.snow.css";
import "./global.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ApolloWrapper host={process.env.NEXT_PUBLIC_API_URL}>
            {children}
          </ApolloWrapper>
        </Providers>
      </body>
    </html>
  );
}
