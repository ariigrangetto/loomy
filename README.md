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
To optimize the booking experience and help users find available time slots more efficiently, the project incorporates an intelligent suggestion system for upcoming appointments.

#### 🛠️ Model Used: TinyLlama
The engine behind these suggestions is TinyLlama, a compact yet highly efficient language model.

The choice of this model was a strategic balance between available computing power and the desired functionality:

Resource Optimization: Due to local hardware limitations (development machine configuration), a lightweight model was prioritized. This allowed for local and stable execution without sacrificing project viability.

The Prompt Engineering Challenge: Being a smaller-scale model, its capacity for strict instruction-following is naturally limited. Achieving precise results required an intensive and meticulous Prompt Engineering process. Crafting the instructions to ensure the model adhered to the system's business rules to the letter, and formatted the data correctly without drifting, represented a significant optimization challenge.

#### 🚀 Benefits of this Implementation
- Privacy and Cost Efficiency: Running a lightweight model locally reduces reliance on expensive external APIs and keeps processing optimized.

- Search Efficiency: The system analyzes open slots and actively suggests the best real-time options to the user.

### 🌆 Preview
(This demonstrates how you can switch between themes.)

<img width="1893" height="948" alt="Captura de pantalla (180)" src="https://github.com/user-attachments/assets/1b8018ec-297e-44b0-a2c5-3cf00d31bf3c" />
<img width="1895" height="955" alt="Captura de pantalla (185)" src="https://github.com/user-attachments/assets/c9de364a-8e13-45c1-8dda-cc3689b5d59b" />
<img width="1920" height="948" alt="Captura de pantalla (188)" src="https://github.com/user-attachments/assets/6d483820-4278-442a-beaf-529cf77f6488" />
<img width="1920" height="943" alt="Captura de pantalla (181)" src="https://github.com/user-attachments/assets/f37fc90d-65d4-4b66-bf8b-1288b1ae9790" />
<img width="1920" height="946" alt="Captura de pantalla (184)" src="https://github.com/user-attachments/assets/3d38e01b-9040-46f4-8431-8241b066cc88" />
<img width="1895" height="952" alt="Captura de pantalla (187)" src="https://github.com/user-attachments/assets/31bb2453-b3ef-4bdf-8b4f-2769230bf8ed" />



