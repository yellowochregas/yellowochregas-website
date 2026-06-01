import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const roleLabels = {
  ADMIN: "Admin",
  ENGINEER: "Engineer",
  CUSTOMER: "Customer"
};

function normaliseRole(value) {
  const role = String(value || "customer").toUpperCase();
  return roleLabels[role] ? role : "CUSTOMER";
}

export default function LoginPage() {
  const { role: roleParam } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const initialRole = useMemo(() => normaliseRole(roleParam), [roleParam]);
  const [form, setForm] = useState({ role: initialRole, email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await auth.login(form);
      const fallback = form.role === "ADMIN" ? "/admin" : form.role === "ENGINEER" ? "/engineer" : "/customer";
      navigate(location.state?.from?.pathname || fallback, { replace: true });
    } catch {
      setError("Those details did not match an active Yellow Ochre Gas account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="admin-login">
      <div className="login-card">
        <Lock aria-hidden="true" />
        <span className="eyebrow">Secure access</span>
        <h1>{roleLabels[form.role]} sign in</h1>
        <p>Use your Yellow Ochre Gas account to open the correct dashboard.</p>

        <form onSubmit={handleSubmit} className="form-grid">
          {error && <p className="form-error" role="alert">{error}</p>}

          <label className="field-block">
            <span>Account type</span>
            <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
              <option value="CUSTOMER">Customer</option>
              <option value="ENGINEER">Engineer</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>

          <label className="field-block">
            <span>Email</span>
            <input
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />
          </label>

          <label className="field-block">
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              required
            />
          </label>

          <button className="primary-button" type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}
