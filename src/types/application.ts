import { Attachment } from "./attachment";

export type ApplicationPayload = {
  job_id: number;
  answers: [{ question: string; answer: string }];
  //   attachments?: [Attachment];
};
