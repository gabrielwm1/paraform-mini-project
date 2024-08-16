export type Attachment = {
  filename: string;
  type: "resume" | "cover_letter" | "admin_only";

  content: string;
  content_type: "application/pdf";
};
