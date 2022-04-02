import { createContext } from "react";
import netlifyIdentity from "netlify-identity-widget";

export const IdentityContext = createContext(netlifyIdentity);
