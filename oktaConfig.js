const oktaConfig = {
  clientId: "0oauz7e4doGHfwIiW697",
  issuer: "https://integrator-1178574.okta.com/oauth2/default",
  redirectUri: "http://localhost:5173/login/callback",
  scopes: ["openid", "profile", "email", "groups"],
  pkce: true,
};

export default oktaConfig;