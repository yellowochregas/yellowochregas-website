import { Navigate, useLocation } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles = [] }) {
  const auth = useAuth();
  const location = useLocation();
  const expectedRole = roles[0]?.toLowerCase() || "customer";

  if (auth.loading) {
    return (
      <section className="admin-login">
        <div className="login-card">
          <Lock aria-hidden="true" />
          <span className="eyebrow">Checking access</span>
          <h1>Loading your secure area</h1>
          <p>Please wait while we confirm your session.</p>
        </div>
      </section>
    );
  }

  if (!auth.isAuthenticated) {
    return <Navigate to={`/login/${expectedRole}`} state={{ from: location }} replace />;
  }

  if (roles.length && !roles.includes(auth.user?.role)) {
    return (
      <section className="admin-login">
        <div className="login-card">
          <Lock aria-hidden="true" />
          <span className="eyebrow">Access restricted</span>
          <h1>This area is not available for your account</h1>
          <p>Sign out and use the correct Yellow Ochre Gas account if you need a different dashboard.</p>
          <button className="primary-button" type="button" onClick={auth.logout}>Sign out</button>
        </div>
      </section>
    );
  }

  return children;
}
