const LoginAuth = async () => {
  const domain = import.meta.env.VITE_AUTHO_DOMAIN;
  const audience = import.meta.env.VITE_AUTHO_DOMAIN;
  const scope = ;
  const clientId = ;
  const responseType = ;
  const redirectUri = ;

  // Construct the authorization URL
  const authorizationUrl = new URL(`https://${domain}/authorize`);
  authorizationUrl.searchParams.set("audience", audience);
  authorizationUrl.searchParams.set("scope", scope);
  authorizationUrl.searchParams.set("response_type", responseType);
  authorizationUrl.searchParams.set("client_id", clientId);
  authorizationUrl.searchParams.set("redirect_uri", redirectUri);

  // Redirect to Auth0 authorization endpoint
  window.location.href = authorizationUrl.toString();
};

export default LoginAuth;
