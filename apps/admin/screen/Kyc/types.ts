export interface cover {
  imageUrl: string;
  setImageUrl: (data: string) => void;
  setCover(data: any): void;
  buttonText?: string;
}

export interface EventFormProps {
  eventCost: string;
  paymentMode: string;
  currency: string;
  eventType: string;
}

export interface country {
  name: string;
  code: string;
}
