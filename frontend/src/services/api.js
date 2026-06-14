import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

// ✅ TEMPORARY DEBUG LINE
console.log("API BASE URL:", baseURL);

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

function authConfig(token) {
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
}

export async function authLogin(credentials) {
  const response = await api.post("/auth/login", credentials);
  return response.data;
}

export async function getMe(token) {
  const response = await api.get("/auth/me", authConfig(token));
  return response.data;
}

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

export async function getMyCustomerBookings(token) {
  const response = await api.get("/customers/me/bookings", authConfig(token));
  return response.data;
}

export async function rebookCustomerService(token, bookingId, payload = {}) {
  const response = await api.post(`/customers/me/bookings/${bookingId}/rebook`, payload, authConfig(token));
  return response.data;
}

export async function reportCustomerIssue(token, payload) {
  const response = await api.post("/customers/me/issues", payload, authConfig(token));
  return response.data;
}

export async function getCustomerReceipt(token, bookingId) {
  const response = await api.get(`/customers/me/bookings/${bookingId}/receipt`, authConfig(token));
  return response.data;
}

export async function getEngineerJobs(engineerId = "demo-engineer") {
  const response = await api.get(`/engineers/${engineerId}/jobs`);
  return response.data;
}

export async function getMyEngineerJobs(token) {
  const response = await api.get("/engineers/me/jobs", authConfig(token));
  return response.data;
}

export async function updateEngineerJob(token, jobId, payload) {
  const response = await api.patch(`/engineers/jobs/${jobId}`, payload, authConfig(token));
  return response.data;
}

export async function getEngineerReport(token, jobId) {
  const response = await api.get(`/engineers/jobs/${jobId}/report`, authConfig(token));
  return response.data;
}

export async function adminLogin(credentials) {
  const response = await api.post("/admin/login", credentials);
  return response.data;
}

export async function getAdminDashboard(token) {
  const response = await api.get("/admin/dashboard", authConfig(token));
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
