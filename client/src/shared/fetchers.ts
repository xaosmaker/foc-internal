import { baseApiRequest } from "@/lib/baseRequests";
import { BASE_URL } from "@/lib/baseUrl";
import { Location } from "@/types/sharedTypes";

export async function getLocations() {
  const res = await baseApiRequest({ url: `${BASE_URL}/api/locations` });
  if (!res.ok) {
    return [];
  }
  const data: Location[] = await res.json();
  return data;
}
