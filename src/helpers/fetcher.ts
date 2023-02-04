export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const bearerToken = localStorage.getItem("token");

  if (!bearerToken) {
    throw new Error("No token found");
  }

  const res = await fetch(input, {
    headers: { Authorization: `Bearer ${bearerToken}` },
  });

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  return res.json();
}
