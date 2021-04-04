import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useReactAuth } from "../../contexts/hooks/AuthContext";

function SignIn() {
  const { user, signIn, loading, signed } = useReactAuth();

  console.log(user, signed, loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    signIn(email, password);
  }

  return (
    <>

      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter e-mail"
        />
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter password"
        />
        <button type="submit">Login</button>
      </form>

      <Link to="/register">Criar conta</Link>
    </>
  );
}

export default SignIn;
