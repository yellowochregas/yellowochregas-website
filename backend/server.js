require("dotenv").config();

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const customerRoutes = require("./routes/customerRoutes");
const engineerRoutes = require("./routes/engineerRoutes");
const publicRoutes = require("./routes/publicRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigin = ["http://localhost:3000", 
                       "https://www.yelloworchregas.co.uk", 
                       "https://yellowochregas.co.uk", 
                       "https://yellowochregas-website.vercel.app", 
                       "https://yellowochregas-website-3gv58udgj-yellowochregas-2591s-projects.vercel.app"];


// ✅ Add THIS as the very first middleware — before cors, helmet, rateLimit, everything
// app.use((req, res, next) => {
//   console.log("INCOMING:", req.method, req.url);
//   next();
// });

//app.use(cors({ origin: allowedOrigin, credentials: true }));
// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }
//     return callback(new Error('Not allowed by CORS'));
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));



// const corsOptions = {
//   origin: function(origin, callback) {
//     // ✅ TEMPORARY — log exactly what origin is received
//     console.log("CORS ORIGIN RECEIVED:", origin);
//     console.log("ALLOWED ORIGINS:", allowedOrigins);
//     console.log("IS ALLOWED:", !origin || allowedOrigins.includes(origin));
//     if (!origin || allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }
//     return callback(new Error('Not allowed by CORS'));
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// };


// TEMPORARY — add after require("dotenv").config();
app.get("/api/debug-env", (req, res) => {
  res.json({
    hasMongoUri: !!process.env.MONGO_URI,
    hasMongoDUri: !!process.env.MONGODB_URI,
    hasJwtSecret: !!process.env.JWT_SECRET,
    hasPepper: !!process.env.PASSWORD_PEPPER,
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT
  });
});

const corsOptions = {
  origin: function(origin, callback) {
    //console.log("CORS ORIGIN RECEIVED:", JSON.stringify(origin));
    
    // ✅ Direct string checks — no array, no hidden character issues
    const allowed = 
      !origin ||
      origin === "http://localhost:3000" ||
      origin === "http://localhost:3001" ||
      origin === "https://www.yellowochregas.co.uk" ||
      origin === "https://yellowochregas.co.uk" ||
      origin === "https://yellowochregas-website.vercel.app" ||
      origin === "https://yellowochregas-website-3gv58udgj-yellowochregas-2591s-projects.vercel.app";

    console.log("IS ALLOWED:", allowed);

    if (allowed) {
      return callback(null, true);
    }
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// ✅ Handle preflight OPTIONS requests across all routes
//app.options('(.*)', cors(corsOptions)); // preflight first

//Handle OPTIONS preflight manually — no wildcard needed
app.use(function(req, res, next) {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(204);
  }
  next();
});

// // ✅ Apply CORS before helmet and everything else
app.use(cors(corsOptions)); // cors second
app.use(helmet()); // helmet third


app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 120 }));

app.get("/api/health", (req, res) => {
  //console.log("HEALTH CHECK HIT");
  res.json({ ok: true, service: "Yellow Ochre Gas API" });
});


// // CORS
// app.use((req, res, next) => { console.log("STEP B: CORS"); next(); });
// app.use(cors(corsOptions));

// // Helmet
// app.use((req, res, next) => { console.log("STEP C: Helmet"); next(); });
// app.use(helmet());

// // JSON body parser
// app.use((req, res, next) => { console.log("STEP D: JSON parser"); next(); });
// app.use(express.json({ limit: "1mb" }));
// app.use(express.urlencoded({ extended: true }));

// // Rate limiter
// app.use((req, res, next) => { console.log("STEP E: Rate limiter"); next(); });
// app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 120 }));

// // Routes
// app.use((req, res, next) => { console.log("STEP F: Routes"); next(); });
// app.get("/api/health", (req, res) => {
//   console.log("HEALTH CHECK HIT");
//   res.json({ ok: true, service: "Yellow Ochre Gas API" });
// });

// TEMPORARY — add right after your CORS/helmet/json middleware, before routes
// app.use((req, res, next) => {
//   console.log("INCOMING:", req.method, req.url);
//   next();
// });


app.use("/api/auth", authRoutes);
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
