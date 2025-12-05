import { auth } from "@/lib/auth";

type ApiMethod = "POST" | "GET" | "PATCH" | "DELETE" | "PUT";
type BaseApiRequest = {
  url: string;
  method?: ApiMethod;
  isAppJson?: boolean;
  data?: FormData | { [key: string]: string | number };
};

export async function baseApiRequest({
  url,
  method = "GET",
  isAppJson = true,
  data,
}: BaseApiRequest) {
  const session = await auth();
  if (!session) {
    throw new Error("Invalid Credential from Session");
  }

  const headers = new Headers();
  headers.append("cookie", session.user.access);
  if (isAppJson) {
    headers.append("Content-Type", "application/json");
  }

  let body = undefined;

  if (data instanceof FormData) {
    body = data;
  } else if (data) {
    body = JSON.stringify(data);
  }

  try {
    const res = await fetch(url, {
      method: method,
      headers: headers,
      body: body,
    });

    return res;
  } catch (e) {
    console.error("base api instance err: ", e, 123);

    return new Response(undefined, {
      status: 500,
      statusText: "internal Server Error.",
    });
  }
}

export async function basePostRequest({
  url,
  data,
}: {
  url: string;
  data: unknown;
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
export async function basePutRequest({
  url,
  data,
}: {
  url: string;
  data: unknown;
}) {
  const session = await auth();

  if (!session) {
    throw new Error("Invalid Credential from Session");
  }

  return await fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      cookie: session.user.access,
    },
    body: JSON.stringify(data),
  });
}

export async function basePatchRequest({ url }: { url: string }) {
  const session = await auth();

  if (!session) {
    throw new Error("Invalid Credential from Session");
  }

  return await fetch(url, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      cookie: session.user.access,
    },
  });
}
