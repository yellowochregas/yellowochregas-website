import { Link } from "react-router-dom";
import { AlertCircle, Droplets, Flame, HelpCircle, Heater, Pipette, Radiation, Settings, ShowerHead } from "lucide-react";
import { issueOptions } from "../data/brand";

const icons = {
  "water-leak": Droplets,
  "no-heating": Heater,
  "boiler-problem": Flame,
  "blocked-drain": ShowerHead,
  "radiator-problem": Radiation,
  "new-installation": Settings,
  "annual-service": Pipette,
  "not-sure": HelpCircle,
  emergency: AlertCircle
};

export default function IssuePicker() {
  return (
    <section className="issue-picker" aria-labelledby="issue-picker-title">
      <h2 id="issue-picker-title">Quick issue buttons</h2>
      <div className="issue-grid">
        {issueOptions.map((issue) => {
          const Icon = icons[issue.id] || HelpCircle;
          return (
            <Link key={issue.id} className="issue-card" to={`/assistant/${issue.id}`}>
              <Icon size={26} aria-hidden="true" />
              <span>
                <strong>{issue.label}</strong>
                <small>{issue.hint}</small>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
