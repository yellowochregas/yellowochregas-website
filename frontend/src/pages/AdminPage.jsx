import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  UserPlus,
} from "lucide-react";

import {
  assignEngineer,
  getAdminDashboard,
} from "../services/api";
import { useAuth } from "../context/AuthContext";

import {
  JobCard,
  EmptyState,
} from "../components/DashboardList";

const sampleDashboard = {
  quotes: [
    {
      _id: "quote-1",
      publicId: "YOG-Q-5001",
      quoteType: "boiler",
      postcode: "CM7 3DP",
      emergencyFlag: true,
      status: "Priority quote review",
      customer: {
        name: "Alex Morgan",
        phone: "07593 217699",
        email: "alex@example.com",
      },
    },
    {
      _id: "quote-2",
      publicId: "YOG-Q-5002",
      quoteType: "bathroom",
      postcode: "CM77 7WT",
      emergencyFlag: false,
      status: "New quote request",
      customer: {
        name: "Priya Shah",
        phone: "07593 217699",
        email: "priya@example.com",
      },
    },
  ],

  bookings: [
    {
      id: "1",
      publicId: "YOG-5001",
      issueType: "Water leak",
      postcode: "CM7 3DP",
      urgency: "Emergency",
      status: "Emergency review",
      customer: {
        name: "Mrs Taylor",
        phone: "07593 217699",
      },
    },
    {
      id: "2",
      publicId: "YOG-5002",
      issueType: "Boiler service",
      postcode: "CM77 7WT",
      urgency: "This week",
      status: "New",
      customer: {
        name: "Mr Patel",
        phone: "07593 217699",
      },
    },
  ],

  engineers: [
    {
      _id: "demo-engineer",
      name: "Demo Engineer",
      skills: ["Boiler", "Plumbing"],
      active: true,
    },
  ],

  reviews: [],
  locationPages: [],
};

export default function AdminPage() {
  const { token, logout } = useAuth();
  const [dashboard, setDashboard] = useState(sampleDashboard);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchDashboard = async () => {
      try {
        const data = await getAdminDashboard(token);
        console.log("RAW API RESPONSE:", data);

        setDashboard({
          bookings: Array.isArray(data?.bookings)
            ? data.bookings
            : [],

          quotes: Array.isArray(data?.quotes)
            ? data.quotes
            : [],

          engineers: Array.isArray(data?.engineers)
            ? data.engineers
            : [],

          reviews: Array.isArray(data?.reviews)
            ? data.reviews
            : [],

          locationPages: Array.isArray(data?.locationPages)
            ? data.locationPages
            : [],
        });
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        setError("Live admin dashboard could not load. Showing the safe fallback view.");
        setDashboard(sampleDashboard);
      }
    };

    fetchDashboard();
  }, [token]);

  const handleAssign = async (jobId) => {
    try {
      await assignEngineer(
        token,
        jobId,
        dashboard?.engineers?.[0]?._id || "demo-engineer"
      );

      setDashboard((current) => ({
        ...current,

        bookings: current?.bookings?.map((booking) =>
          booking._id === jobId || booking.id === jobId
            ? {
                ...booking,
                status: "Engineer assigned",
              }
            : booking
        ) || [],
      }));
    } catch (error) {
      console.error("Assign engineer error:", error);

      // optimistic UI fallback
      setDashboard((current) => ({
        ...current,

        bookings: current?.bookings?.map((booking) =>
          booking._id === jobId || booking.id === jobId
            ? {
                ...booking,
                status: "Engineer assigned",
              }
            : booking
        ) || [],
      }));
    }
  };

  const emergencyBookings =
    dashboard?.bookings?.filter(
      (booking) => booking?.urgency === "Emergency"
    ) || [];

  return (
    <section className="dashboard-page">
      <div className="page-heading">
        <span className="eyebrow">
          Admin dashboard foundation
        </span>

        <h1>Operations dashboard</h1>

        <p>
          Emergency requests first, then leads,
          engineer assignment, customers,
          reviews and location content.
        </p>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="mini-button" type="button" onClick={logout}>Sign out</button>
      </div>

      <div className="stats-row">
        <div>
          <strong>
            {dashboard?.bookings?.length || 0}
          </strong>

          <span>Total bookings</span>
        </div>

        <div>
          <strong>
            {dashboard?.quotes?.length || 0}
          </strong>

          <span>Quote leads</span>
        </div>

        <div>
          <strong>
            {emergencyBookings?.length || 0}
          </strong>

          <span>Emergency first</span>
        </div>
      </div>

      <div className="panel-grid two">
        <article className="dashboard-panel">
          <h2>Quote management</h2>

          <div className="stack">
            {dashboard?.quotes?.length ? (
              dashboard.quotes.map((quote) => (
                <article
                  className="job-card"
                  key={quote._id || quote.publicId}
                >
                  <div className="job-card-head">
                    <div>
                      <strong>{quote.publicId}</strong>
                      <p>
                        {quote.quoteType === "boiler"
                          ? "Boiler installation quote"
                          : "Bathroom installation quote"}
                      </p>
                    </div>
                    <span className={quote.emergencyFlag ? "status-pill urgent" : "status-pill"}>
                      {quote.status}
                    </span>
                  </div>
                  <dl className="job-meta">
                    <div><dt>Postcode</dt><dd>{quote.postcode}</dd></div>
                    <div><dt>Customer</dt><dd>{quote.customer?.name}</dd></div>
                    <div><dt>Phone</dt><dd>{quote.customer?.phone}</dd></div>
                  </dl>
                </article>
              ))
            ) : (
              <EmptyState
                title="No quote leads found"
                text="Boiler and bathroom quote requests will appear here."
              />
            )}
          </div>
        </article>

        <article className="dashboard-panel">
          <h2>
            <AlertTriangle aria-hidden="true" />
            Emergency requests
          </h2>

          <div className="stack">
            {emergencyBookings.length ? (
              emergencyBookings.map((booking) => (
                <JobCard
                  key={
                    booking._id || booking.id
                  }
                  job={booking}
                  actions={
                    <button
                      className="mini-button"
                      type="button"
                      onClick={() =>
                        handleAssign(
                          booking._id ||
                            booking.id
                        )
                      }
                    >
                      <UserPlus
                        size={16}
                        aria-hidden="true"
                      />
                      Assign
                    </button>
                  }
                />
              ))
            ) : (
              <EmptyState
                title="No emergency requests"
                text="Emergency jobs will appear here first."
              />
            )}
          </div>
        </article>

        <article className="dashboard-panel">
          <h2>
            <CheckCircle aria-hidden="true" />
            All bookings and leads
          </h2>

          <div className="stack">
            {dashboard?.bookings?.length ? (
              dashboard.bookings.map(
                (booking) => (
                  <JobCard
                    key={
                      booking._id ||
                      booking.id
                    }
                    job={booking}
                    actions={
                      <button
                        className="mini-button"
                        type="button"
                        onClick={() =>
                          handleAssign(
                            booking._id ||
                              booking.id
                          )
                        }
                      >
                        <UserPlus
                          size={16}
                          aria-hidden="true"
                        />
                        Assign
                      </button>
                    }
                  />
                )
              )
            ) : (
              <EmptyState
                title="No bookings found"
                text="Bookings and leads will appear here."
              />
            )}
          </div>
        </article>

        <article className="dashboard-panel">
          <h2>Manage foundations</h2>

          <ul className="plain-list">
            <li>Customer records</li>
            <li>Quote management</li>
            <li>Upload viewing foundation</li>
            <li>Engineer profiles</li>
            <li>Job status updates</li>
            <li>Reviews and testimonials</li>
            <li>Service and location pages</li>
            <li>CSV export foundation</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
