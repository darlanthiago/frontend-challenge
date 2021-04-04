import React from "react";
import { Link } from "react-router-dom";
import { useReactAuth } from "../../contexts/hooks/AuthContext";

export default function Home() {
  const { signOut, user } = useReactAuth();
  return (
    <div>
      <h1>{`Olá, ${user.name}`}</h1>
      <button onClick={signOut}>Sair</button>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}
