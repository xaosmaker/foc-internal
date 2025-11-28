import { BASE_URL } from "@/lib/baseUrl";
import { Location } from "@/types/sharedTypes";

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
    console.log("getStatusCodes Error: ", e);
    return [];
  }
}

export async function getLocations() {
  try {
    const res = await fetch(`${BASE_URL}/api/locations`);
    const data: Location[] = await res.json();
    return data;
  } catch (e) {
    console.log("getLocations Error: ", e);

    return [];
  }
}
