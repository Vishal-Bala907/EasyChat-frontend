// keycloak.js
import Keycloak from "keycloak-js";

// Initialize Keycloak instance only once
const kc = new Keycloak({
  url: "http://localhost:8080",
  realm: "EasyChat",
  clientId: "easy-chat",
  pkceMethod: "S256",
});

export default kc;
