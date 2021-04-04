import React from "react";

import { AuthProvider } from "./AuthContext/index";

export default function AppProvider({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
