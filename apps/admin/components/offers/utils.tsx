export const getModalDescription = (dialogAction?: "ENABLE" | "DISABLE") => {
  switch (dialogAction) {
    case "DISABLE":
      return "This will temporarily disable the job. It will not be visible until re-enabled.";
    case "ENABLE":
      return "This will re-enable the job and make it visible again.";
    default:
      return "";
  }
};

export const getModalTitle = (dialogAction?: "ENABLE" | "DISABLE") => {
  switch (dialogAction) {
    case "DISABLE":
      return "Disable Job";
    case "ENABLE":
      return "Enable Job";
    default:
      return "Confirm Action";
  }
};
