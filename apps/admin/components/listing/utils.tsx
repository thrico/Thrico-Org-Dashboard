export const getModalDescription = (
  dialogAction?:
    | "APPROVE"
    | "DISABLE"
    | "ENABLE"
    | "REJECT"
    | "VERIFY"
    | "UNVERIFY"
    | "REAPPROVE"
    | "PAUSE"
) => {
  switch (dialogAction) {
    case "APPROVE":
      return "This will approve the listing and make it visible to all users.";

    case "DISABLE":
      return "This will temporarily disable the listing. It will not be visible until re-enabled.";
    case "ENABLE":
      return "This will re-enable the listing and make it visible again.";

    case "REJECT":
      return "This will reject the listing. It will not be published on the platform.";

    case "VERIFY":
      return "This will mark the listing as verified, indicating it meets platform guidelines.";
    case "UNVERIFY":
      return "This will remove the verified status from the listing.";
    case "REAPPROVE":
      return "This will change the listing's status from rejected to approved, making it visible to users.";
    case "PAUSE":
      return "This will pause the listing. It will not be accessible until resumed.";
    default:
      return "";
  }
};

export const getModalTitle = (
  dialogAction?:
    | "APPROVE"
    | "DISABLE"
    | "ENABLE"
    | "REJECT"
    | "VERIFY"
    | "UNVERIFY"
    | "REAPPROVE"
    | "PAUSE"
) => {
  switch (dialogAction) {
    case "APPROVE":
      return "Approve Listing";

    case "DISABLE":
      return "Disable Listing";
    case "ENABLE":
      return "Enable Listing";

    case "REJECT":
      return "Reject Listing";

    case "VERIFY":
      return "Verify Listing";
    case "UNVERIFY":
      return "Remove Listing Verification";
    case "REAPPROVE":
      return "Re-approve Listing";
    case "PAUSE":
      return "Pause Listing";

    default:
      return "Confirm Action";
  }
};
