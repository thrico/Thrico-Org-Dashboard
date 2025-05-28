// Enum for result visibility
export enum ResultVisibility {
  ALWAYS = "ALWAYS",
  AFTER_VOTE = "AFTER_VOTE",
  AFTER_END = "AFTER_END",
  ADMIN = "ADMIN",
}

export enum Status {
  APPROVED = "APPROVED",
  DISABLED = "DISABLED",
}

// Define the Option interface (customize as needed)
export interface Option {
  id: string;
  text: string;
  order: number; // Optional example field
}

// Main Poll interface
export interface FormField {
  id: string;
  formId: string;
  question: string;
  type: string;
  order: number;
  options?: string[]; // assuming options are strings; update if needed
  required: boolean;
  maxLength?: number;
  scale?: number;
  ratingType?: string;
  min?: number;
  max?: number;
  labels?: string[];
  allowMultiple?: boolean;
  fieldName?: string;
  defaultValue?: any; // could be string, number, etc. — adjust if needed
  allowedTypes?: string[];
  maxSize?: number;
}

export interface Form {
  id: string;
  appearance?: string;
  previewType?: string;
  description?: string;

  fields: FormField[];
  status?: string;
  title: string;
  endDate?: string; // use `Date` if parsed, or `string` if raw ISO
}
