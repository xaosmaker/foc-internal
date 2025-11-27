import { BASE_URL } from "@/lib/baseUrl";

export type StatusCodes = Array<{ value: number; label: string }>;

export async function getStatusCodes() {
  try {
    const res = await fetch(`${BASE_URL}/api/StatusCodes`, {
      next: { revalidate: false, tags: ["StatusCodes"] },
      cache: "force-cache",
    });
    const data: StatusCodes = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
}
