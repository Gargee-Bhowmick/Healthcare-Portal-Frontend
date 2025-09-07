import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AppState from "./context/AppState";
import RedirectOnReload from "./routes/RedirectOnReload";
import { AuthProvider } from "../src/components/Provider/AuthProvider";
import { LoadingProvider } from "../src/components/Provider/LoadingProvider";
import FullPageLoader from "../src/components/common/FullPageLoader"
export default function App() {
  return (
    <AppState>
      <Router>
          <LoadingProvider>
            <AuthProvider>
              <RedirectOnReload />
              <FullPageLoader />
              <AppRoutes />
            </AuthProvider>
          </LoadingProvider>
      </Router>
    </AppState>
  );
}