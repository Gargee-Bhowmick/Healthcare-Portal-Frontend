import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AppState from "./context/AppState";
import RedirectOnReload from "./routes/RedirectOnReload";
export default function App() {
  return (
    <AppState>
      <Router>
        <RedirectOnReload />
        <AppRoutes />
      </Router>
    </AppState>
  );
}