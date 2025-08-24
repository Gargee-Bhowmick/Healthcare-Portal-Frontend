import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AppState from "./context/AppState";

export default function App() {
  return (
    <AppState>
      <Router>
        <AppRoutes />
      </Router>
    </AppState>
  );
}