// Lightweight wrapper around $fetch that handles errors consistently
export function useApi() {
  async function get<T = unknown>(url: string, opts?: RequestInit): Promise<T> {
    return $fetch<T>(url, { method: "GET", credentials: "include", ...opts });
  }

  async function post<T = unknown>(url: string, body?: unknown): Promise<T> {
    return $fetch<T>(url, {
      method: "POST",
      credentials: "include",
      body: body as BodyInit,
    });
  }

  async function put<T = unknown>(url: string, body?: unknown): Promise<T> {
    return $fetch<T>(url, {
      method: "PUT",
      credentials: "include",
      body: body as BodyInit,
    });
  }

  async function del<T = unknown>(url: string): Promise<T> {
    return $fetch<T>(url, { method: "DELETE", credentials: "include" });
  }

  return { get, post, put, del };
}
