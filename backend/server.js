require("dotenv").config();

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const customerRoutes = require("./routes/customerRoutes");
const engineerRoutes = require("./routes/engineerRoutes");
const publicRoutes = require("./routes/publicRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3000";

app.use(helmet());
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 120 }));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "Yellow Ochre Gas API" });
});

app.use("/api/bookings", bookingRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/engineers", engineerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", publicRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Yellow Ochre Gas API running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed", error.message);
    process.exit(1);
  });

module.exports = app;
