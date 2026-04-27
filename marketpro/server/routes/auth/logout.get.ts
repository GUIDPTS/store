// Proxy /auth/logout to backend, clear session cookie, redirect to home.
export default defineEventHandler(async event => {
  const backendUrl = process.env.BACKEND_URL || "http://backend:8080";

  await fetch(`${backendUrl}/auth/logout`, {
    method: "GET",
    redirect: "manual",
    headers: { cookie: getHeader(event, "cookie") || "" },
  }).catch(() => {});

  // Expire the session cookie in the browser
  appendHeader(event, "set-cookie", "session_id=; Path=/; Max-Age=0; HttpOnly");

  return sendRedirect(event, "/", 302);
});
