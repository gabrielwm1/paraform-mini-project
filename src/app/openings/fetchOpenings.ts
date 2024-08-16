export async function fetchOpenJobs() {
  try {
    const res = await fetch("https://harvest.greenhouse.io/v1/job_posts", {
      method: "GET",
      headers: {
        // Authorization: "Basic f06b2b153e016f8e7c3632627af56b1d-7", // Replace with your Base64 encoded API key
        // "Content-Type": "application/json",
      },
    });
    const data = await res.json();
  } catch (error) {}
}
