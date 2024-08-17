import { AddCandidatePayload } from "@/types/candidate";
// todo: get my greenhouse user Id

export async function createCandidate({
  payload,
}: {
  payload: AddCandidatePayload;
}) {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Basic ${process.env.NEXT_PUBLIC_GREENHOUSE_API_KEY}`
  );
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("On-Behalf-Of", "userId");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ ...payload }),
  };

  try {
    const response = await fetch(
      `https://harvest.greenhouse.io/v1/candidates`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching job posts:", error);
  }
}
