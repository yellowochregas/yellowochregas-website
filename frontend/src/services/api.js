import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

export async function createBooking(payload) {
  const response = await api.post("/bookings", payload);
  return response.data;
}

export async function createQuote(payload) {
  const response = await api.post("/quotes", payload);
  return response.data;
}

export async function getBooking(id, phone) {
  const response = await api.get(`/bookings/${id}`, { params: { phone } });
  return response.data;
}

export async function getReviews() {
  const response = await api.get("/reviews");
  return response.data;
}

export async function getLocationPage(slug) {
  const response = await api.get(`/locations/${slug}`);
  return response.data;
}

export async function getCustomerBookings(phone) {
  const response = await api.get("/customers/bookings", { params: { phone } });
  return response.data;
}

export async function getEngineerJobs(engineerId = "demo-engineer") {
  const response = await api.get(`/engineers/${engineerId}/jobs`);
  return response.data;
}

export async function updateEngineerJob(jobId, payload) {
  const response = await api.patch(`/engineers/jobs/${jobId}`, payload);
  return response.data;
}

export async function adminLogin(credentials) {
  const response = await api.post("/admin/login", credentials);
  return response.data;
}

export async function getAdminDashboard(token) {
  const response = await api.get("/admin/dashboard", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

export async function assignEngineer(token, jobId, engineerId) {
  const response = await api.patch(
    `/admin/jobs/${jobId}/assign`,
    { engineerId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}
