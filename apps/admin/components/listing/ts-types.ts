export interface PhotoUploadFile extends File {
  uid: string;
  name: string;
  thumbUrl?: string;
}
