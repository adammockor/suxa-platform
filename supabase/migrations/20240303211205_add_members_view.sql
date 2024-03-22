-- Remove public.users.email 
ALTER TABLE
  "public"."users"
DROP COLUMN
  "email";

-- Create admin only view of auth_users in public to allow access to specific data with Supabase public API
-- https://github.com/supabase/gotrue-js/issues/359#issuecomment-1203893970
CREATE VIEW public.auth_users AS SELECT id, email, email_confirmed_at, last_sign_in_at, created_at FROM auth.users;

-- only postgres role has access
REVOKE all ON public.auth_users FROM anon, authenticated;