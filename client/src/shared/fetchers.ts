import { auth } from "@/lib/auth";
import { baseGetRequest } from "@/lib/baseRequests";
import { BASE_URL } from "@/lib/baseUrl";
import { Location } from "@/types/sharedTypes";

export type StatusCodes = Array<{ value: number; label: string }>;

export async function getStatusCodes() {
  const session = await auth();

  if (!session) {
    throw new Error("Invalid Credential from Session");
  }
  try {
    const res = await fetch(`${BASE_URL}/api/StatusCodes`, {
      headers: {
        cookie: session.user.access,
      },
      next: { revalidate: false, tags: ["StatusCodes"] },
      cache: "force-cache",
    });
    const data: StatusCodes = await res.json();
    return data;
  } catch (e) {
    console.error("getStatusCodes Error: ", e);
    return [];
  }
}

export async function getLocations() {
  try {
    const res = await baseGetRequest({ url: `${BASE_URL}/api/locations` });
    const data: Location[] = await res.json();
    return data;
  } catch (e) {
    console.error("getLocations Error: ", e);

    return [];
  }
}
