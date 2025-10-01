// File: utils/index.ts

export const getActionsForModule = (module: string) => {
  const moduleActions = {
    feed: [
      { value: "create_post", label: "Create Post" },
      { value: "like_post", label: "Like Post" },
      { value: "comment_post", label: "Comment on Post" },
      { value: "share_post", label: "Share Post" },
    ],
    listing: [
      { value: "post_job", label: "Post Job" },
      { value: "apply_job", label: "Apply for Job" },
      { value: "save_job", label: "Save Job" },
      { value: "view_job", label: "View Job Details" },
    ],
    profile: [
      { value: "complete_profile", label: "Complete Profile" },
      { value: "add_skill", label: "Add Skill" },
      { value: "update_bio", label: "Update Bio" },
      { value: "add_experience", label: "Add Work Experience" },
    ],
    social: [
      { value: "follow_user", label: "Follow User" },
      { value: "get_endorsement", label: "Receive Endorsement" },
      { value: "give_endorsement", label: "Give Endorsement" },
      { value: "send_message", label: "Send Message" },
    ],
    networking: [
      { value: "join_group", label: "Join Group" },
      { value: "create_group", label: "Create Group" },
      { value: "attend_event", label: "Attend Event" },
      { value: "create_event", label: "Create Event" },
    ],
  };
  return moduleActions[module] || [];
};
