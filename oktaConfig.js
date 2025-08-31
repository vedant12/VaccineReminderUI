const oktaConfig = {
  clientId: "0oauz7e4doGHfwIiW697",
  issuer: "https://integrator-1178574.okta.com/oauth2/default",
  redirectUri: window.location.origin + "/login/callback",
  postLogoutRedirectUri: window.location.origin,       // redirects to home after logout
  pkce: true,
  scopes: ["openid", "profile", "email", "groups"],
};

export default oktaConfig;