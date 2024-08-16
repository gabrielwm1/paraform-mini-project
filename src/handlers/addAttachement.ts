// todo: get my greenhouse user Id

import { Attachment } from "@/types/attachment";

export async function addAttachemnt({
  application_id,
  attachmentPayload,
}: {
  application_id: string;
  attachmentPayload: Attachment;
}) {
  try {
    const response = await fetch(
      `https://harvest.greenhouse.io/v1/applications/${application_id}/attachments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "On-Behalf-Of": "",
          Authorization: `Basic ${process.env.NEXT_PUBLIC_GREENHOUSE_API_KEY}`,
        },
        body: JSON.stringify({
          ...attachmentPayload,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error creating candidate:", error);
    throw error;
  }
}
