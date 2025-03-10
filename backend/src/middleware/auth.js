import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "https://www.bitescout-api",
  issuerBaseURL: "https://dev-2gka6am75v8uuchh.us.auth0.com/",
  tokenSigningAlg: 'RS256'

});

export default jwtCheck;
