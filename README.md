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

#### /Login

<img width="1893" height="948" alt="Captura de pantalla (180)" src="https://github.com/user-attachments/assets/1b8018ec-297e-44b0-a2c5-3cf00d31bf3c" />
<img width="1895" height="955" alt="Captura de pantalla (185)" src="https://github.com/user-attachments/assets/c9de364a-8e13-45c1-8dda-cc3689b5d59b" />

#### /Register
<img width="1898" height="948" alt="Captura de pantalla (186)" src="https://github.com/user-attachments/assets/2c5b4ecc-83f2-47f4-9665-95b314fc84e1" />
<img width="1895" height="952" alt="Captura de pantalla (187)" src="https://github.com/user-attachments/assets/9db9e6cc-5bc8-4f5a-a7f6-18bc11c1f407" />

#### /Reset password

<img width="1920" height="948" alt="Captura de pantalla (188)" src="https://github.com/user-attachments/assets/3539b030-d774-4b60-867f-67a8e289209f" />
<img width="1920" height="952" alt="Captura de pantalla (201)" src="https://github.com/user-attachments/assets/00b194e5-14fc-4e82-8bd9-4aec3789df04" />

#### /Update password

<img width="1920" height="948" alt="Captura de pantalla (203)" src="https://github.com/user-attachments/assets/1dd3fc11-9938-4f8a-afeb-5619e73e97cc" />
<img width="1920" height="955" alt="Captura de pantalla (202)" src="https://github.com/user-attachments/assets/a8fa49dd-aa76-4a77-91e5-9fb62a3db6ed" />

#### /Dashboard

<img width="1900" height="957" alt="Captura de pantalla (199)" src="https://github.com/user-attachments/assets/375162a8-c402-4534-8959-1e7a475cd1f8" />
<img width="1895" height="954" alt="Captura de pantalla (195)" src="https://github.com/user-attachments/assets/5736b564-0b11-47fe-90b8-688b84daf275" />

#### /Edit
<img width="1904" height="952" alt="Captura de pantalla (196)" src="https://github.com/user-attachments/assets/69b764d2-fdde-4355-b4c0-35c08fac2171" />
<img width="1900" height="950" alt="Captura de pantalla (200)" src="https://github.com/user-attachments/assets/aae8aaf1-f174-47bb-b4b1-a9528ad1cc1d" />

#### /Client History
<img width="1920" height="943" alt="Captura de pantalla (197)" src="https://github.com/user-attachments/assets/b2c5a4f6-904a-4bd6-a5e2-779836524243" />
<img width="1920" height="953" alt="Captura de pantalla (198)" src="https://github.com/user-attachments/assets/7c00c237-e8d8-4e04-aa95-d214ac36d011" />



