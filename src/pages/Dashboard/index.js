import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IntlCurrencyInput from "react-intl-currency-input";

import { useReactAuth } from "../../contexts/hooks/AuthContext";
import api from "../../config/api";
import Echo from "../../config/websockets";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { user } = useReactAuth();

  const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };

  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [value, setValue] = useState(0.0);

  const [valueToSend, setValueToSend] = useState(0);
  const [emailToSend, setEmailToSend] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { data } = await api.get("/api/wallet");

      setValue(parseFloat(data.wallet.value));

      setLoading(false);
    })();
  }, []);

  const handleAddValue = useCallback((newValue) => {
    setValue((prevState) => prevState + parseFloat(newValue));

    let currency = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(newValue);

    return toast.success(`🤑 Você Recebeu uma nova transação de ${currency}`);
  }, []);

  useEffect(() => {
    Echo.private(`send.transaction.status.${user.id}`).listen(
      "NotificationTransaction",
      (data) => {
        handleAddValue(data.value);
      }
    );
  }, [handleAddValue, user.id]);

  const handleChangeCurrency = useCallback((event, value, maskedValue) => {
    event.preventDefault();

    setValueToSend(value);

    // console.log(value); // value without mask (ex: 1234.56)
    // console.log(maskedValue); // masked value (ex: R$1234,56)
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      setSubmitLoading(true);

      await api
        .post("/api/transaction", {
          value: parseFloat(valueToSend),
          payeer_email: emailToSend,
        })
        .then((resp) => {
          setSubmitLoading(false);

          setValue((prevState) => prevState - parseFloat(valueToSend));

          return toast.success("📤 Transação Enviada!");
        })
        .catch((error) => {
          setSubmitLoading(false);

          alert("Transação não pode ser enviada");

          return toast.error("❌ Transação não pode ser enviada!");
        });
    },
    [emailToSend, valueToSend]
  );

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>
        Saldo em Carteira:
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(value)}
        </strong>
      </h2>

      {user.user_type === "user" && (
        <form method="POST" onSubmit={handleSubmit}>
          <IntlCurrencyInput
            currency="BRL"
            name="value"
            config={currencyConfig}
            value={valueToSend}
            onChange={handleChangeCurrency}
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail do Recebedor"
            value={emailToSend}
            onChange={(e) => setEmailToSend(e.target.value)}
          />

          <button type="submit">
            {submitLoading ? "Enviando ..." : "Enviar"}
          </button>
        </form>
      )}

      <Link to="/home">Home</Link>
    </div>
  );
}
