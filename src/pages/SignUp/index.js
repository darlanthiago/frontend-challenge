import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/api";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [document, setDocument] = useState("");
  const [userType, setSetUserType] = useState("user");

  console.log(userType);

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      console.log(email, name, password, document, userType);
      setLoading(true);

      api
        .post("/api/user/register", {
          name,
          email,
          password,
          document,
          user_type: userType,
        })
        .then((resp) => {
          setLoading(false);
          toast.success("✅ Usuário Registrado com Sucesso");
          history.push("/");
        })
        .catch((err) => {
          setLoading(false);
        });
    },
    [document, email, history, name, password, userType]
  );

  return (
    <>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Enter Name"
        />
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
        <input
          type="text"
          name="document"
          onChange={(e) => setDocument(e.target.value)}
          value={document}
          placeholder="Enter document CPF/CNPJ"
        />

        <div className="radio">
          <label>
            <input
              type="radio"
              value="user"
              name="userType"
              onChange={(e) => setSetUserType("user")}
              defaultChecked={userType === "user"}
            />
            Usuário
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="store"
              name="userType"
              onChange={(e) => setSetUserType("store")}
              defaultChecked={userType === "store"}
            />
            Loja
          </label>
        </div>

        <button type="submit">{loading ? "Saving ..." : "Save"}</button>
      </form>

      <Link to="/">Login</Link>
    </>
  );
}

export default SignUp;
