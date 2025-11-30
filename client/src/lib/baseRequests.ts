export async function basePostRequest<T>({
  url,
  data,
}: {
  url: string;
  data: T;
}) {
  return await fetch(url, {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
