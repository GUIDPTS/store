// Proxy /auth/login to backend WITHOUT following redirects.
// Nitro's built-in proxy follows 307 server-side which breaks OAuth.
export default defineEventHandler(async event => {
  const query = getQuery(event);
  const backendUrl = process.env.BACKEND_URL || "http://backend:8080";
  const url = new URL(`${backendUrl}/auth/login`);
  if (query.redirect) url.searchParams.set("redirect", String(query.redirect));

  const res = await fetch(url.toString(), {
    method: "GET",
    redirect: "manual",
    headers: { cookie: getHeader(event, "cookie") || "" },
  });

  // Forward Set-Cookie headers (session_id) to the browser
  const cookies = res.headers.getSetCookie?.() ?? [];
  cookies.forEach(c => appendHeader(event, "set-cookie", c));

  // Forward the Location redirect to the browser
  const location = res.headers.get("location");
  if (location) {
    return sendRedirect(event, location, res.status || 302);
  }

  throw createError({ statusCode: 502, message: "Auth login redirect failed" });
});
