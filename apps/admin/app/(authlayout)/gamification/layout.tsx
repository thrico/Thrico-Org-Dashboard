"use client";
import * as React from "react";
import { Card, TabsProps } from "antd";

import GamificationItemsLayout from "../../../screen/comman/GamificationMenuLayout";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GamificationItemsLayout>
        <Card>{children}</Card>
      </GamificationItemsLayout>
    </>
  );
}

export default RootLayout;
