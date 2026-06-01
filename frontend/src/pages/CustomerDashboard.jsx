import { Link } from "react-router-dom";
import { CalendarClock, FileText, RotateCcw } from "lucide-react";
import { JobCard, EmptyState } from "../components/DashboardList";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getCustomerReceipt, getMyCustomerBookings, rebookCustomerService, reportCustomerIssue } from "../services/api";

export default function CustomerDashboard() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState({ loading: true, message: "" });

  useEffect(() => {
    let active = true;

    async function loadBookings() {
      try {
        const data = await getMyCustomerBookings(token);
        if (active) setBookings(Array.isArray(data) ? data : []);
      } catch {
        if (active) setStatus({ loading: false, message: "Could not load your bookings. Please call if this is urgent." });
        return;
      }

      if (active) setStatus({ loading: false, message: "" });
    }

    loadBookings();
    return () => {
      active = false;
    };
  }, [token]);

  const handleRebook = async (bookingId) => {
    setStatus({ loading: false, message: "Sending rebook request..." });
    try {
      const booking = await rebookCustomerService(token, bookingId);
      setBookings((current) => [booking, ...current]);
      setStatus({ loading: false, message: "Rebook request sent. We will contact you to confirm." });
    } catch {
      setStatus({ loading: false, message: "Rebook could not be sent online. Please call now if you need help." });
    }
  };

  const handleReportIssue = async () => {
    setStatus({ loading: false, message: "Opening a new issue request..." });
    try {
      const booking = await reportCustomerIssue(token, { issueType: "New issue", urgency: "Flexible" });
      setBookings((current) => [booking, ...current]);
      setStatus({ loading: false, message: "New issue reported. We will contact you for the details." });
    } catch {
      setStatus({ loading: false, message: "Could not create a new issue online. Please call now if this is urgent." });
    }
  };

  const handleReceipt = async (bookingId) => {
    try {
      const receipt = await getCustomerReceipt(token, bookingId);
      const blob = new Blob([JSON.stringify(receipt, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${receipt.receiptId || "yellow-ochre-receipt"}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setStatus({ loading: false, message: "Receipt is not available yet for that booking." });
    }
  };

  return (
    <section className="dashboard-page">
      <div className="page-heading">
        <span className="eyebrow">Customer area foundation</span>
        <h1>My bookings</h1>
        <p>A simple customer space for current jobs, completed work, service history and receipts.</p>
        {status.message && <p className="quote-submit-state offline" role="status">{status.message}</p>}
      </div>

      <div className="panel-grid two">
        <article className="dashboard-panel">
          <h2>Current job status</h2>
          <div className="stack">
            {status.loading ? (
              <EmptyState title="Loading your bookings" text="Checking current jobs and history." />
            ) : bookings.length ? bookings.map((booking) => (
              <JobCard
                key={booking._id || booking.publicId}
                job={{
                  ...booking,
                  status: booking.job?.status || booking.status,
                  engineer: booking.job?.engineer || null
                }}
                actions={(
                  <>
                    <button className="mini-button" type="button" onClick={() => handleRebook(booking._id)}><RotateCcw size={16} aria-hidden="true" /> Rebook</button>
                    <button className="mini-button" type="button" onClick={() => handleReceipt(booking._id)}><FileText size={16} aria-hidden="true" /> Receipt</button>
                  </>
                )}
              />
            )) : (
              <EmptyState title="No bookings found" text="Start the assistant to request help, or call now if you are worried." />
            )}
          </div>
        </article>

        <article className="dashboard-panel">
          <h2>Quick actions</h2>
          <div className="action-list">
            <Link to="/assistant/annual-service"><RotateCcw aria-hidden="true" /> Rebook service</Link>
            <Link to="/assistant/not-sure"><CalendarClock aria-hidden="true" /> Report a new problem</Link>
            <button type="button" onClick={handleReportIssue}><FileText aria-hidden="true" /> Create account issue record</button>
          </div>
        </article>
      </div>
    </section>
  );
}
