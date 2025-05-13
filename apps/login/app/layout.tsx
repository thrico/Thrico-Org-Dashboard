import Providers from "@repo/ui/Providers";
import { ApolloWrapper } from "../components/hoc/ApolloWrapper";
import { workSans } from "./font";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <Providers>
          <ApolloWrapper host={"http://localhost:1111/graphql"}>
            {children}
          </ApolloWrapper>
        </Providers>
      </body>
    </html>
  );
}
