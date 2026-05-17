import { NavLink, Outlet, useLocation } from "react-router-dom";
import { CalendarCheck, ClipboardList, Home, MapPinned, ShieldCheck, UserCog, Wrench } from "lucide-react";
import EmergencyCTA from "./EmergencyCTA";
import { brand } from "../data/brand";

const navItems = [
  { to: "/", label: "Help", icon: Home },
  { to: "/areas/braintree", label: "Areas", icon: MapPinned },
  { to: "/customer", label: "My jobs", icon: CalendarCheck },
  { to: "/engineer", label: "Engineer", icon: Wrench },
  { to: "/admin", label: "Admin", icon: UserCog }
];

export default function AppShell() {
  const location = useLocation();
  const isDashboard = ["/admin", "/engineer", "/customer"].some((path) => location.pathname.startsWith(path));

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="app-header">
        <NavLink className="brand-lockup" to="/" aria-label="Yellow Ochre Gas home">
          <span className="brand-mark" aria-hidden="true">YO</span>
          <span>
            <strong>Yellow Ochre Gas</strong>
            <small><ShieldCheck size={14} aria-hidden="true" /> Gas Safe registered messaging</small>
          </span>
        </NavLink>
        <a className="header-call" href={`tel:${brand.phoneTel}`}>Call now</a>
      </header>

      <EmergencyCTA />

      <main id="main" tabIndex="-1" className={isDashboard ? "page-main dashboard-main" : "page-main"}>
        <Outlet />
      </main>

      <nav className="bottom-nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.to} to={item.to} end={item.to === "/"}>
              <Icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <footer className="app-footer">
        <div>
          <strong>{brand.name}</strong>
          <p>{brand.trustLine}</p>
        </div>
        <div className="footer-links">
          <NavLink to="/strategy"><ClipboardList size={16} aria-hidden="true" /> Product spec</NavLink>
          <a href={`tel:${brand.phoneTel}`}>{brand.phoneDisplay}</a>
        </div>
      </footer>
    </div>
  );
}
