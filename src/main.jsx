import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AuthContext from "../config/AuthContext.jsx";
import { Provider } from "react-redux";
import store from "../redux/ConfigureStore.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// import "primeicons/primeicons.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <AuthContext>
      <App />
    </AuthContext>
  </Provider>
  // </StrictMode>
);
