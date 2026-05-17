import { AlertTriangle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { brand } from "../data/brand";

export default function EmergencyCTA({ compact = false }) {
  return (
    <aside className={compact ? "emergency-strip compact" : "emergency-strip"} aria-label="Emergency contact options">
      <div className="emergency-copy">
        <AlertTriangle size={20} aria-hidden="true" />
        <span>
          <strong>Worried or urgent?</strong>
          <small>Call now or start an emergency request.</small>
        </span>
      </div>
      <div className="emergency-actions">
        <a className="call-action" href={`tel:${brand.phoneTel}`}>
          <Phone size={18} aria-hidden="true" />
          Call {brand.phoneDisplay}
        </a>
        <Link className="urgent-action" to="/assistant/emergency">I need urgent help</Link>
      </div>
    </aside>
  );
}
