// Proxy /auth/callback to backend WITHOUT following redirects.
// Must forward the session_id cookie so backend can verify oauth_state.
export default defineEventHandler(async event => {
  const query = getQuery(event);
  const backendUrl = process.env.BACKEND_URL || "http://backend:8080";
  const url = new URL(`${backendUrl}/auth/callback`);
  Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  const res = await fetch(url.toString(), {
    method: "GET",
    redirect: "manual",
    headers: { cookie: getHeader(event, "cookie") || "" },
  });

  // Forward Set-Cookie headers (session_id with user) to the browser
  const cookies = res.headers.getSetCookie?.() ?? [];
  cookies.forEach(c => appendHeader(event, "set-cookie", c));

  const location = res.headers.get("location");
  if (location) {
    return sendRedirect(event, location, res.status || 302);
  }

  // If no redirect, it may be an error response — show it
  const body = await res.text();
  throw createError({ statusCode: res.status || 502, message: body || "Auth callback failed" });
});
