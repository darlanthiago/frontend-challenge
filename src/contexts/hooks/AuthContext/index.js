import React, { createContext, useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import api from "../../../config/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [data, setData] = useState(async () => {
    const token = localStorage.getItem("@RJSAuth:token");
    const user = localStorage.getItem("@RJSAuth:user");

    setLoading(true);

    //check token is valid

    api
      .get("/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        if (resp.data) {
          setData({
            token,
            user: JSON.parse(user),
          });
          api.defaults.headers["Authorization"] = `Bearer ${token}`;
          setLoading(false);
        }
      })
      .catch((error) => {
        localStorage.removeItem("@RJSAuth:token");
        localStorage.removeItem("@RJSAuth:user");
        delete api.defaults.headers.common["Authorization"];
        delete api.defaults.headers.common["XSRF-TOKEN"];
        Cookies.remove("XSRF-TOKEN");
        setData({});
        setLoading(false);
      });
  });

  const signIn = useCallback(
    async (email, password) => {
      setLoading(true);

      await api.get("/sanctum/csrf-cookie");
      api
        .post("/api/auth/login", {
          email,
          password,
        })
        .then((response) => {
          const { token, user } = response.data;

          api.defaults.headers["Authorization"] = `Bearer ${token}`;

          localStorage.setItem("@RJSAuth:user", JSON.stringify(user));
          localStorage.setItem("@RJSAuth:token", token);

          setData({ token, user });

          history.push("/home");

          setLoading(false);
        })
        .catch((error) => {
          setData({});
          setLoading(false);
        });
    },
    [history]
  );

  const signOut = useCallback(async () => {
    setLoading(true);

    api
      .delete("/api/auth/logout")
      .then((resp) => {
        localStorage.removeItem("@RJSAuth:token");
        localStorage.removeItem("@RJSAuth:user");
        delete api.defaults.headers.common["Authorization"];
        delete api.defaults.headers.common["XSRF-TOKEN"];
        Cookies.remove("XSRF-TOKEN");

        setData({});
        history.push("/");
        setLoading(false);
      })
      .catch((error) => {
        localStorage.removeItem("@RJSAuth:token");
        localStorage.removeItem("@RJSAuth:user");
        delete api.defaults.headers.common["Authorization"];
        delete api.defaults.headers.common["XSRF-TOKEN"];
        Cookies.remove("XSRF-TOKEN");
        setData({});
        setLoading(false);
      });
  }, [history]);

  return (
    <AuthContext.Provider
      value={{ signed: !!data.user, user: data.user, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useReactAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useReactAuth must be used within an AuthProvider");
  }

  return context;
}
