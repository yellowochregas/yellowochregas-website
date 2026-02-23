# Yellow Ochre Gas - Website PRD

## Original Problem Statement
Build a modern, responsive, professional SPA website for Yellow Ochre Gas - a family-run plumbing and heating company in Barking IG11 0QA, UK. 24/7 emergency service, 5.0 rating (166 reviews).

## User Personas
- **Homeowners**: Need emergency plumbing/heating repairs or scheduled installations
- **Landlords**: Require Gas Safety Certificates and regular maintenance
- **Property Managers**: Seeking reliable contractors for multiple properties

## Core Requirements
- Hero section with 24/7 messaging and CTAs
- About Us highlighting family business, certifications
- 8 Services cards with icons
- Reviews section with carousel
- Service Areas with Google Maps embed
- Contact form storing to MongoDB
- Password-protected admin dashboard

## What's Been Implemented (Jan 2026)
- ✅ Full SPA with all sections (Hero, About, Services, Reviews, Areas, Contact, Footer)
- ✅ Backend API (FastAPI): /api/contact, /api/reviews, /api/admin/*
- ✅ MongoDB integration for contact storage
- ✅ Admin dashboard with basic auth (admin/yellowochre2024)
- ✅ Mobile responsive with hamburger menu
- ✅ Google Maps embed for Barking location
- ✅ Oswald + Manrope fonts, Yellow/Grey/White color scheme
- ✅ shadcn UI components (carousel, sheet, cards, buttons)

## Prioritized Backlog
### P0 (Critical) - Done
- [x] Core SPA functionality
- [x] Contact form & storage
- [x] Admin dashboard

### P1 (Important)
- [ ] Email notifications on new contact submissions
- [ ] SEO meta tags optimization
- [ ] Google Analytics integration

### P2 (Nice to have)
- [ ] Service booking calendar
- [ ] Customer portal
- [ ] Online payment for quotes

## Tech Stack (MERN)
- **M**ongoDB: Database for contact storage
- **E**xpress.js: Backend API server (Node.js)
- **R**eact 19: Frontend with Tailwind CSS, shadcn/ui
- **N**ode.js: Runtime for Express backend

## Admin Credentials
- Username: admin
- Password: yellowochre2024
