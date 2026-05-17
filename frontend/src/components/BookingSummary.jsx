import { issueOptions } from "../data/brand";

function labelForIssue(issueId) {
  return issueOptions.find((issue) => issue.id === issueId)?.label || "Emergency request";
}

function prettyLabel(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

export default function BookingSummary({ booking }) {
  const rows = [
    ["Problem", labelForIssue(booking.issueType || booking.issueId)],
    ["Postcode", booking.postcode || booking.answers?.postcode],
    ["Urgency", booking.urgency || booking.answers?.urgency],
    ["Name", booking.customer?.name || booking.answers?.name],
    ["Phone", booking.customer?.phone || booking.answers?.phone],
    ["Preference", booking.preference || booking.answers?.preference]
  ].filter((row) => row[1]);

  Object.entries(booking.answers || {}).forEach(([key, value]) => {
    if (!value || ["postcode", "urgency", "name", "phone", "preference"].includes(key)) return;
    rows.push([prettyLabel(key), value]);
  });

  return (
    <dl className="summary-list">
      {rows.map(([label, value]) => (
        <div className="summary-row" key={label}>
          <dt>{label}</dt>
          <dd>{String(value)}</dd>
        </div>
      ))}
    </dl>
  );
}
