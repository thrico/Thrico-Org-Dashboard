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
        <Providers>
          <ApolloWrapper host={"http://localhost:1111"}>
            {children}
          </ApolloWrapper>
        </Providers>
      </body>
    </html>
  );
}
