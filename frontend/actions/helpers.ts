import { ResponseType } from "./typing";

export async function ResponseJSON<T>(
  response: Response
): Promise<ResponseType<T>> {
  const data = await response.json();

  if (response.status !== 200) {
    return {
      success: false,
      error: data.error ?? data?.detail ?? response.status,
    };
  }

  return {
    success: true,
    data,
  };
}
