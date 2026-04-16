---
name: "supabase security check"
description: "Check if the supabase database implementation is secure, optimized and correct"
---

# Supabase Security & Optimization Auditor

This agent skill is designed to perform a comprehensive audit of the Supabase implementation within this project.

## Workflow Instructions

When invoked, perform the following steps sequentially to ensure the Supabase integration is optimal, secure, and correct.

### Step 1: Automated Advisor Checks
The Supabase Server exposes advisory tools that automatically detect vulnerabilities and performance bottlenecks.
1. Run `mcp_supabase_get_advisors` with `type: "security"`.
2. Run `mcp_supabase_get_advisors` with `type: "performance"`.
3. Report any critical or high-severity findings directly. Provide the remediation URLs to the user so they can address them easily.

### Step 2: Secret & Key Management Validation
Perform a static analysis of the frontend codebase to ensure no sensitive Supabase keys are exposed.
1. Use `grep_search` to find instances of environment variable references related to Supabase (e.g., `VITE_SUPABASE_URL`, `SUPABASE_KEY`).
2. Ensure that only the **anon** or **publishable** key (e.g., `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` or `VITE_SUPABASE_ANON_KEY`) is used for client-side initialization (`createClient`).
3. If a `service_role` key is found inside any client-side code (like React components or frontend initializers), raise a **CRITICAL WARNING**. The service role bypasses RLS completely and should ONLY be used in secure, server-side environments (like Edge Functions or secure backends).

### Step 3: Row Level Security (RLS) Review
RLS is the primary method for protecting data in Supabase.
1. Using the `security` advisors output from Step 1, verify if there are any warnings about missing RLS policies for active tables.
2. Ensure that any table accessed by the frontend has RLS enabled to prevent unauthorized reads and writes.

### Step 4: Client Instantiation Optimization
Ensure that the Supabase client is instantiated correctly to avoid memory leaks or unnecessary connection overhead.
1. Locate the Supabase integration file (e.g., `src/supabase/client.ts`).
2. Ensure the `createClient` function is evaluated only once as a singleton and exported for use across the application, rather than being repeatedly instantiated inside individual components or hooks.

### Step 5: Edge Functions Review (If applicable)
1. Run `mcp_supabase_list_edge_functions` to see if the project utilizes edge functions.
2. Review specific functions to verify deployment security, specifically ensuring that `verify_jwt: true` is enforced for private API routes to properly control access.

### Final Output Requirements
After performing these checks, compile a summarized response or markdown artifact for the user, categorized into:
- 🚨 **Critical Vulnerabilities** (if any)
- ⚠️ **Warnings & Improvements** (best practices and performance advice)
- ✅ **Passed Checks**

Always emphasize actionable advice. Reference specific file paths and configurations you analyzed.