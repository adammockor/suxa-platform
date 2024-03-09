-- Set public.users.email type as text
ALTER TABLE
  "public"."users"
ALTER COLUMN
  "email"
SET
  data TYPE text USING "email"::text;

-- Add email to public.users.email if email should be visible
UPDATE "public"."users" p
SET email = a.email
FROM "auth"."users" a
WHERE p.id = a.id AND p.email_visible = true;
