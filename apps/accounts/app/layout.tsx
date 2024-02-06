import Providers from "@repo/ui/Providers";
import { ApolloWrapper } from "../components/hoc/ApolloWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper host={"http://localhost:1111/"}>
          <Providers>{children}</Providers>
        </ApolloWrapper>
      </body>
    </html>
  );
}
