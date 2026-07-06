Lordradeez Academy
Online Courses Platform — feature-rich digital education hub, built by Lordradeez.

[Live Demo](https://lordradeez-academy.vercel.app) | [License](file:///c:/Users/lordr/Downloads/E-Learning-Platform-main/E-Learning-Platform-main/LICENSE) | Built by Lordradeez

The Problem
Traditional education systems and unstructured tutorials create fragmented learning paths. Aspiring students struggle to find organized, high-quality course curricula that guide them from beginner to advanced concepts, while industry instructors lack accessible, integrated platforms to publish course materials, manage dynamic class rosters, and directly engage with their learners.

When curriculum structure, student progression, student discussions, and course evaluations live in separate silos, the quality of digital education degrades.

The Solution
Lordradeez Academy is a unified online courses platform that bridges the gap between students and instructors. It organizes learning resources into structured categories, chapters, and video lessons, tracks individual student progression, and incorporates reviews and comments directly into the player interface. Instructors can manage their course catalogs, evaluate students, and moderate comments from dedicated dashboards, creating an integrated ecosystem.

A student goes from onboarding to playing their first lesson in under a minute.

Core Features

Feature | Description
--- | ---
Unified Authentication | Dual authentication using custom form validations and Google OAuth credentials.
Role-based Access | Route-specific guard policies dynamically serving Admin, Instructor, and Student dashboards.
Interactive Lesson Player | Custom video dashboard rendering chapters, lesson materials, and active student comment sections side-by-side.
Global State Persisted Cart | Caches selected courses across reloads using Redux Persist local storage integration.
Dynamic Category Filtering | Multi-sector course catalog segmented by categories (Development, Marketing, Music) with real-time query rendering.
Admin Course Control | Complete portal enabling administrators to monitor student enrollment, register instructors, and modify payouts.
Instructor Catalog Management | Dedicated panel for educators to add or edit courses, upload lesson videos, and track earning charts.
Progressive Web App (PWA) | Built-in manifest and service worker configuration supporting offline capabilities and responsive app layouts.
Theme Customization | Dark and light mode toggle utilizing standard next-themes classes.

Architecture

┌─────────────────────────────────────────────────────────────────┐
│                    Lordradeez Academy Platform                  │
├──────────────────────┬──────────────────────────────────────────┤
│   Frontend (React)   │            Backend & Server              │
│                      │                                          │
│  Pages & Routes      │  Server Actions (Database CRUD)          │
│    /home             │    getCoursesAction                      │
│    /all-courses      │    getCourseBySlugAction                 │
│    /account/settings │    userLoginAction                       │
│    /admin            │    userRegisterAction                    │
│    /instructor-dash  │    addCommentAction                      │
│                      │    addReviewAction                       │
│  State & Theme       │                                          │
│    Redux Persist     │  API Routes                              │
│    Next-Themes       │    /api/auth/google/login                │
│    GSAP Animations   │    /api/auth/google/callback             │
│                      │    /api/courses/search                   │
│  Components          │                                          │
│    ShadCN UI         │  Edge Middleware (jose)                  │
│    SwiperJS Carousel │    JWT Verification & Route Guarding     │
└──────────────────────┴──────────────────────────────────────────┘

Tech Stack

Frontend
- React 19, Next.js 15 (App Router)
- Tailwind CSS 4, ShadCN UI
- SwiperJS (course carousels)
- GSAP, @gsap/react (motion and timeline animations)
- React Toastify (status feedback)

Backend
- Node.js, Next.js Server Actions
- Jose, JsonWebToken (session encryption)
- Prisma Client with Accelerate extension

Database
- SQLite (local development / testing)
- PostgreSQL (production)

State Management
- Redux Toolkit, Redux Persist

Getting Started

Prerequisites
- Node.js 18 or later
- npm 9 or later

Installation
1. Clone the repository and navigate to the project directory:
   cd E-Learning-Platform

2. Install dependencies:
   npm install

3. Configure your environment variables. Create a .env file in the root directory:
   DATABASE_URL="file:./dev.db"
   JWT_SECRET_KEY="local_secret_key_for_development_purposes_12345"
   FRONTEND_URL="http://localhost:3000"

4. Synchronize the Prisma schema and initialize the database:
   npx prisma generate
   npx prisma db push

5. Populate the database with mock data:
   npx prisma db seed

6. Start the local Next.js development server:
   npm run dev

The web application is now available at http://localhost:3000.

API Reference

REST API
Method | Endpoint | Description
--- | --- | ---
GET | /api/auth/google/login | Initiates Google OAuth Login Flow
GET | /api/auth/google/callback | Handles Google OAuth Redirection Callback
GET | /api/courses/search | Endpoint for courses search index querying
GET | /api/user | Get current user info

Server Actions
Action | Parameters | Description
--- | --- | ---
getCoursesAction | skip, take | Fetches a paginated list of courses with categories, instructors, and enrollments
getCourseBySlugAction | slug | Retrieves complete course information, chapters, and reviews
userLoginAction | credentials | Authenticates credentials and sets a JWT session cookie
userRegisterAction | userData | Creates a new user profile with hashed credentials
addCommentAction | commentData | Submits a new comment on a course lesson
addReviewAction | reviewData | Submits a review and updates the course rating aggregates

Deployment

Vercel Deployment
1. Connect your repository to Vercel.
2. Configure environment variables (DATABASE_URL, JWT_SECRET_KEY, FRONTEND_URL).
3. Set the build command to `npm run build` (which generates the Prisma client and compiles the Next.js build bundle).
4. Deploy the application.

Business Model

Channel | Description | Target
--- | --- | ---
Course Purchases | Standard single-purchase model for individual courses | Individuals seeking structured professional certification
Subscription Pass | Monthly or annual subscription to access all courses in the catalog | Students looking for cross-disciplinary training
Instructor Revenue Share | Commission-based fee (e.g. 20%) taken from course sales published on the platform | Freelance developers, marketers, and design educators

Market
- Global e-learning market size: estimated to exceed 460B USD.
- Rising demand for structured remote learning solutions and professional digital skill acquisition.
- Corporate skill development market growing at over 15% CAGR.
- Uninsured career seekers looking to pivot into software engineering or marketing with minimal entry cost.

Competitive Position

Platform | Catalog Structure | Student Engagement | Automated Dashboards | Local-Friendly
--- | --- | --- | --- | ---
Udemy | Large but inconsistent | Standard reviews | Simple analytics | Global focus only
Coursera | Academic focus | Assignment-locked | Institution-focused | High entry fee
edX | University-driven | Lecture-based | Partner portal | Academic only
Lordradeez Academy | Highly structured | Integrated video comments | Dual Admin and Instructor portals | Easy setup, local-friendly

Team
- Lordradeez - Founder, product design and core engineering

License
MIT License - see LICENSE

Lordradeez Academy is a product of Lordradeez Academy, Egypt/Global.
