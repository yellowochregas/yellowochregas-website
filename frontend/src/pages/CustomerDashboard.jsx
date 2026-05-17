import { Link } from "react-router-dom";
import { CalendarClock, FileText, RotateCcw } from "lucide-react";
import { JobCard, EmptyState } from "../components/DashboardList";

function localBookings() {
  return JSON.parse(localStorage.getItem("yellow-ochre-bookings") || "[]");
}

export default function CustomerDashboard() {
  const bookings = localBookings();

  return (
    <section className="dashboard-page">
      <div className="page-heading">
        <span className="eyebrow">Customer area foundation</span>
        <h1>My bookings</h1>
        <p>A simple customer space for current jobs, completed work, service history and receipts.</p>
      </div>

      <div className="panel-grid two">
        <article className="dashboard-panel">
          <h2>Current job status</h2>
          <div className="stack">
            {bookings.length ? bookings.map((booking) => <JobCard key={booking.publicId} job={booking} />) : (
              <EmptyState title="No saved bookings on this device" text="Start the assistant to request help." />
            )}
          </div>
        </article>

        <article className="dashboard-panel">
          <h2>Quick actions</h2>
          <div className="action-list">
            <Link to="/assistant/annual-service"><RotateCcw aria-hidden="true" /> Rebook service</Link>
            <Link to="/assistant/not-sure"><CalendarClock aria-hidden="true" /> Report a new problem</Link>
            <button type="button"><FileText aria-hidden="true" /> Receipts and invoices foundation</button>
          </div>
        </article>
      </div>
    </section>
  );
}
