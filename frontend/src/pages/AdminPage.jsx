import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Lock,
  UserPlus,
} from "lucide-react";

import {
  adminLogin,
  assignEngineer,
  getAdminDashboard,
} from "../services/api";

import {
  JobCard,
  EmptyState,
} from "../components/DashboardList";

const sampleDashboard = {
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
  const [credentials, setCredentials] = useState({
    email: "admin@yellowochregas.local",
    password: "",
  });

  const [token, setToken] = useState(
    localStorage.getItem("yellow-ochre-admin-token") || ""
  );

  const [dashboard, setDashboard] = useState(sampleDashboard);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchDashboard = async () => {
      try {
        const data = await getAdminDashboard(token);

        setDashboard({
          bookings: Array.isArray(data?.bookings)
            ? data.bookings
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

        // fallback safe state
        setDashboard(sampleDashboard);
      }
    };

    fetchDashboard();
  }, [token]);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    try {
      const response = await adminLogin(credentials);

      localStorage.setItem(
        "yellow-ochre-admin-token",
        response.token
      );

      setToken(response.token);
    } catch (loginError) {
      console.error(loginError);

      setError(
        "Admin login is not connected or the credentials are incorrect. Use the backend seed to create an admin user."
      );
    }
  };

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

  if (!token) {
    return (
      <section className="admin-login">
        <div className="login-card">
          <Lock aria-hidden="true" />

          <span className="eyebrow">
            Admin foundation
          </span>

          <h1>Yellow Ochre Gas admin</h1>

          <p>
            Dashboard foundation for emergency
            requests, leads, engineers, reviews
            and local content.
          </p>

          <form
            onSubmit={handleLogin}
            className="form-grid"
          >
            {error && (
              <p
                className="form-error"
                role="alert"
              >
                {error}
              </p>
            )}

            <label className="field-block">
              <span>Email</span>

              <input
                type="email"
                value={credentials.email}
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    email: event.target.value,
                  })
                }
              />
            </label>

            <label className="field-block">
              <span>Password</span>

              <input
                type="password"
                value={credentials.password}
                placeholder="Seeded admin password"
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    password: event.target.value,
                  })
                }
              />
            </label>

            <button
              className="primary-button"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
      </section>
    );
  }

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
            {emergencyBookings?.length || 0}
          </strong>

          <span>Emergency first</span>
        </div>

        <div>
          <strong>
            {dashboard?.engineers?.length || 0}
          </strong>

          <span>Engineers</span>
        </div>
      </div>

      <div className="panel-grid two">
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