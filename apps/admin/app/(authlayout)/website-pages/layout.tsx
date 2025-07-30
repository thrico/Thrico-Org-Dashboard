"use client";
import * as React from "react";
import { Card, TabsProps } from "antd";

import PagesItemsLayout from "../../../screen/comman/layout/PagesLayout";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PagesItemsLayout>
        <Card>{children}</Card>
      </PagesItemsLayout>
    </>
  );
}

export default RootLayout;
