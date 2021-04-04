import React from "react";
import { useReactAuth } from "../contexts/hooks/AuthContext";

import PrivateRoutes from "./private.routes";
import PublicRoutes from "./public.routes";

export default function Routes() {
  const { signed, loading } = useReactAuth();

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return signed ? <PrivateRoutes /> : <PublicRoutes />;
}
