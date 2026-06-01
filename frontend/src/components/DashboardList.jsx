import { Phone } from "lucide-react";

export function JobCard({ job, actions }) {
  return (
    <article className="job-card">
      <div className="job-card-head">
        <div>
          <strong>{job.publicId || job.id || job._id}</strong>
          <p>{job.issueType || job.issue || job.serviceName}</p>
        </div>
        <span className={job.urgency === "Emergency" ? "status-pill urgent" : "status-pill"}>{job.status || job.urgency || "Open"}</span>
      </div>
      <dl className="job-meta">
        <div><dt>Postcode</dt><dd>{job.postcode || job.location || "Pending"}</dd></div>
        <div><dt>Customer</dt><dd>{job.customer?.name || job.customerName || "Customer"}</dd></div>
        <div><dt>Phone</dt><dd>{job.customer?.phone || job.phone || "Not shared"}</dd></div>
        {job.engineer && <div><dt>Engineer</dt><dd>{job.engineer.name || "Assigned"}</dd></div>}
      </dl>
      <div className="job-actions">
        {(job.customer?.phone || job.phone) && (
          <a className="mini-button dark" href={`tel:${job.customer?.phone || job.phone}`}>
            <Phone size={16} aria-hidden="true" />
            Call customer
          </a>
        )}
        {actions}
      </div>
    </article>
  );
}

export function EmptyState({ title, text }) {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}
