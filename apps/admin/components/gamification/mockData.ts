// File: data/mockData.ts

export const mockPointRules = [
  {
    id: 1,
    action: "create_post",
    trigger: "first_time",
    points: 10,
    description: "Create your first post",
  },
  {
    id: 2,
    action: "like_post",
    trigger: "recurring",
    points: 2,
    description: "Like a post",
  },
  {
    id: 3,
    action: "apply_job",
    trigger: "recurring",
    points: 5,
    description: "Apply for a job",
  },
];

export const mockBadges = [
  {
    id: 1,
    name: "Feed Master",
    type: "action",
    condition: "Make 50 posts",
    icon: "📝",
    description: "Posted 50 times in the feed",
    module: "feed",
    action: "create_post",
    targetValue: 50,
  },
  {
    id: 2,
    name: "Point Beast",
    type: "points",
    condition: "Reach 1000 points",
    icon: "⭐",
    description: "Accumulated 1000 total points",
    module: "",
    action: "",
    targetValue: 1000,
  },
];

export const mockRanks = [
  {
    id: 1,
    name: "Rookie",
    type: "points",
    minPoints: 0,
    maxPoints: 99,
    color: "#94a3b8",
    icon: "🟤",
  },
  {
    id: 2,
    name: "Explorer",
    type: "points",
    minPoints: 100,
    maxPoints: 499,
    color: "#3b82f6",
    icon: "🔵",
  },
  {
    id: 3,
    name: "Legend",
    type: "points",
    minPoints: 500,
    maxPoints: null,
    color: "#f59e0b",
    icon: "🟡",
  },
];
