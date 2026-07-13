<h1>📅 Appointment Management System v2.0</h1>

### 📝 Description
This project is a full-stack evolution of my very first programming application. Originally built with vanilla JavaScript and CSS, this version has been completely re-engineered to solve real-world scheduling challenges for a professional hair salon.

The application goes beyond simple scheduling; it acts as a Client Relationship Management (CRM) tool. It allows the administrator to track client history, review previous services provided, and monitor the time elapsed since the last visit, enabling a more personalized and professional service.

### 🚀 Evolution & Learning Goals
This rewrite served as a benchmark for my growth as a developer. I migrated the entire architecture to a modern stack to implement better patterns and more robust features:

- From JS/CSS to TypeScript & Tailwind: Enhancing type safety and UI consistency.

- Database Migration: Moving to Supabase for real-time data handling and secure authentication.

- Architecture & Quality: Implementing CI/CD pipelines and automated testing to ensure a production-ready environment.

### 🛠️ Tech Stack
- Frontend: React, TypeScript, Tailwind CSS.

- Backend & Database: Supabase (Auth, PostgreSQL, Edge Functions).

- Testing: Vitest, React Testing Library.

- DevOps: GitHub Actions (CI/CD), Vercel.

- Workflow: Custom MCPs (Model Context Protocol) for Notion (task tracking) and Supabase integration.

### ✨ Key Features
- Advanced Scheduling: Dynamic time-slot management.

- Client Insights: Detailed history logs including past services and "days since last visit" metrics.

- Security: Protected routes and row-level security (RLS) via Supabase.

- Performance Optimized: Focused on React performance patterns (Memoization, optimized re-renders) verified through custom profiling.

Automated Workflow: Continuous integration and deployment with automated testing for every push.

### 🤖 AI Integration: Smart Appointment Suggestions
To optimize the booking experience and help users find available time slots more efficiently, the project incorporates an intelligent suggestion system for upcoming appointments powered by the Google Gemini API.

### 🧠 How it Works
The application utilizes the Google Gemini API to analyze current scheduling constraints and real-time availability. By processing these data points, the system generates optimized, actionable appointment suggestions that are displayed directly to the user as a prompt.

### 🚀 Benefits of this Implementation
- Actionable Insights: The system translates raw availability into precise, user-ready suggestions, minimizing decision fatigue for the client.

- Reliability and Precision: By leveraging a high-performance model, the application ensures consistent, rule-compliant output every time a suggestion is triggered.



