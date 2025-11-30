import { auth } from "@/lib/auth";

export async function basePostRequest<T>({
  url,
  data,
}: {
  url: string;
  data: T;
}) {
  const session = await auth();

  if (!session) {
    throw new Error("Invalid Credential from Session");
  }

  return await fetch(url, {
    method: "post",
    headers: {
      "content-type": "application/json",
      cookie: session.user.access,
    },
    body: JSON.stringify(data),
  });
}

export async function baseGetRequest({ url }: { url: string }) {
  const session = await auth();

  if (!session) {
    throw new Error("Invalid Credential from Session");
  }

  return await fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      cookie: session.user.access,
    },
  });
}

export async function baseDeleteRequest({ url }: { url: string }) {
  const session = await auth();

  if (!session) {
    throw new Error("Invalid Credential from Session");
  }

  return await fetch(url, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      cookie: session.user.access,
    },
  });
}
