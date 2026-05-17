require("dotenv").config();

const connectDB = require("../config/db");
const AdminUser = require("../models/AdminUser");
const Engineer = require("../models/Engineer");
const LocationPage = require("../models/LocationPage");
const Review = require("../models/Review");
const Service = require("../models/Service");

const areas = [
  "Braintree",
  "Witham",
  "Halstead",
  "Great Notley",
  "Rayne",
  "Coggeshall",
  "Chelmsford",
  "Dunmow",
  "Colchester",
  "Essex"
];

const services = [
  ["emergency-plumbing", "Emergency plumbing", "Fast help for urgent leaks, blocked drains, and plumbing worries.", true],
  ["boiler-repair", "Boiler repair", "Safe boiler fault help from qualified Gas Safe registered engineers.", true],
  ["annual-boiler-service", "Annual boiler service", "Routine service reminders, checks, and service history foundation.", false],
  ["radiator-repair", "Radiator repair", "Help with leaking, cold, noisy, or uneven radiators.", false],
  ["new-installation", "New installation", "Boilers, heating controls, radiators, bathroom plumbing, and pipework.", false]
];

const reviews = [
  ["Haleemat Rasheex", "They are a great company, they go above and beyond to make their customers happy. Been using them for years now, would absolutely recommend."],
  ["Fokhor Uddin", "Very good service and prices would highly recommend."],
  ["Mohammed Nazrul Islam", "5 star service, I have used this company for my plumbing needs."],
  ["Halimat Raheem", "They are a great company, they go above and beyond to make their customers happy. Been using them for years now, would absolutely recommend."],
  ["Joel Meghan", "They are a great company, they go above and beyond to make their customers happy. Been using them for years now, would absolutely recommend."]
];

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function seed() {
  await connectDB();

  await AdminUser.findOneAndUpdate(
    { email: process.env.SEED_ADMIN_EMAIL || "admin@yellowochregas.local" },
    {
      name: "Yellow Ochre Admin",
      email: process.env.SEED_ADMIN_EMAIL || "admin@yellowochregas.local",
      passwordHash: AdminUser.hashPassword(process.env.SEED_ADMIN_PASSWORD || "yellowochre2024"),
      role: "admin",
      active: true
    },
    { upsert: true }
  );

  await Engineer.findOneAndUpdate(
    { email: "engineer@yellowochregas.local" },
    {
      name: "Demo Gas Safe Engineer",
      phone: "+447593217699",
      email: "engineer@yellowochregas.local",
      gasSafeNumber: "Demo Gas Safe profile",
      skills: ["Boiler", "Heating", "Plumbing"],
      active: true
    },
    { upsert: true }
  );

  for (const [serviceSlug, title, summary, emergencyEligible] of services) {
    await Service.findOneAndUpdate(
      { slug: serviceSlug },
      {
        slug: serviceSlug,
        title,
        plainEnglishSummary: summary,
        emergencyEligible,
        safetyNotes: ["Gas and boiler work must be handled by qualified Gas Safe registered engineers."],
        active: true
      },
      { upsert: true }
    );
  }

  for (const area of areas) {
    await LocationPage.findOneAndUpdate(
      { slug: slug(area) },
      {
        slug: slug(area),
        areaName: area,
        title: `Plumbing, boiler and heating help in ${area}`,
        intro: `Plain English local help for ${area} homes, landlords and businesses, with urgent call support always visible.`,
        services: services.map((item) => item[1]),
        faqs: [
          { question: "Can I call instead of using the assistant?", answer: "Yes. The phone number stays visible because many people prefer to speak to a person." },
          { question: "Do I need an account?", answer: "No. You can request help without creating an account." },
          { question: "Can you help with boilers?", answer: "Yes. Boiler and gas work must be handled by a qualified Gas Safe registered engineer." }
        ],
        published: true
      },
      { upsert: true }
    );
  }

  for (const [name, text] of reviews) {
    await Review.findOneAndUpdate(
      { name, text },
      { name, text, rating: 5, source: "Google", approved: true },
      { upsert: true }
    );
  }

  console.log("Seed data complete");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
