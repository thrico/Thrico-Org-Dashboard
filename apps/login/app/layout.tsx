import Providers from "@thrico/ui/Providers";
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
          <ApolloWrapper host={"https://admin.thrico.app/graphql"}>
            {children}
          </ApolloWrapper>
        </Providers>
      </body>
    </html>
  );
}
