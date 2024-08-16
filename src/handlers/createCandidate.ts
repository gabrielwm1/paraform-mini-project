import { AddCandidatePayload } from "@/types/candidate";

// todo: get my greenhouse user Id

export async function createCandidate({
  payload,
}: {
  payload: AddCandidatePayload;
}) {
  try {
    const response = await fetch(
      "https://harvest.greenhouse.io/v1/candidates",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "On-Behalf-Of": "",
          Authorization: `Basic ${process.env.NEXT_PUBLIC_GREENHOUSE_API_KEY}`,
        },
        body: JSON.stringify({
          ...payload,
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
