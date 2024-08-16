import { ApplicationPayload } from "./application";

type EmailType = "personal" | "work" | "other";
type WebsiteType = "personal" | "company" | "portfolio" | "blog" | "other";

type EmailAddress = {
  type: EmailType;
  email: string;
};

type WebsiteAddress = {
  type: WebsiteType;
  url: string;
};

export type AddCandidatePayload = {
  first_name: string;
  last_name: string;
  company?: string;
  title?: string;
  email_addresses?: EmailAddress[];
  website_addresses?: WebsiteAddress[];
  tags?: string[];
  applications: ApplicationPayload[];
};
