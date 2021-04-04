import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppProvider from "./contexts/hooks/index";

import Routes from "./routes";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
        <ToastContainer autoClose={3000} />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
