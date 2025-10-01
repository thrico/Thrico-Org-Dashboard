// File: components/GamificationAdmin.tsx
"use client";

import { useState } from "react";
import { Tabs } from "antd";
import { TrophyOutlined } from "@ant-design/icons";
import { mockBadges, mockPointRules, mockRanks } from "./mockData";
import PointsTab from "./points-tab/PointsTab";
import BadgesTab from "./BadgesTab";
import RanksTab from "./RanksTab";

const { TabPane } = Tabs;

export default function GamificationAdmin() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <TrophyOutlined className="text-yellow-500 text-2xl" />
        <div>
          <h1 className="text-3xl font-bold">Thrico Gamification</h1>
          <p className="text-muted-foreground">
            Configure points, badges, and ranks for user engagement
          </p>
        </div>
      </div>

      <Tabs defaultActiveKey="points">
        <TabPane
          tab={
            <span>
              <TrophyOutlined /> Points
            </span>
          }
          key="points"
        >
          <PointsTab pointRules={pointRules} setPointRules={setPointRules} />
        </TabPane>
        <TabPane tab={<span>🎖️ Badges</span>} key="badges">
          <BadgesTab badges={badges} setBadges={setBadges} />
        </TabPane>
        <TabPane tab={<span>👑 Ranks</span>} key="ranks">
          <RanksTab ranks={ranks} setRanks={setRanks} badges={badges} />
        </TabPane>
      </Tabs>
    </div>
  );
}
