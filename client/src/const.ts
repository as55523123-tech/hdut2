export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  // provide clear errors when required env vars are missing or invalid
  if (!oauthPortalUrl || !appId) {
    throw new Error(
      "Missing VITE_OAUTH_PORTAL_URL or VITE_APP_ID in environment.\n" +
        "Set VITE_OAUTH_PORTAL_URL to a full URL (e.g. https://portal.example.com)\n" +
        "and VITE_APP_ID to your application id."
    );
  }

  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  let url: URL;
  try {
    // normalize trailing slash and build URL
    url = new URL(`${oauthPortalUrl.replace(/\/+$|\s+/g, "")}/app-auth`);
  } catch (e) {
    throw new Error(`Invalid VITE_OAUTH_PORTAL_URL: ${oauthPortalUrl}`);
  }
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
