import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function RedirectOnReload() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Only run this logic on reload
    if (location.pathname.startsWith("/doctor") && location.pathname !== "/doctor") {
      navigate("/doctor", { replace: true });
    } else if (location.pathname.startsWith("/patient") && location.pathname !== "/patient") {
      navigate("/patient", { replace: true });
    }
  }, []); // run only once on mount

  return null;
}
