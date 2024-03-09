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

-- CREATE FUNCTION update_user_email_visibility() RETURNS trigger language plpgsql AS $$ BEGIN
-- INSERT INTO
--   salary_log(employee_id, old_salary, new_salary)
-- VALUES
--   (new.id, old.salary, new.salary);
-- RETURN new;
-- END;
-- $$;

-- CREATE trigger user_email_is_visible_change
-- AFTER
-- INSERT OR UPDATE
--   ON "public"."users" FOR each ROW EXECUTE FUNCTION update_user_email_visibility();

CREATE VIEW "public"."members" WITH (security_invoker) AS
SELECT
  public.users.id,
  public.users.name,
  public.users.surename,
  public.users.job_role,
  public.users.email,
  public.users.organization,
  public.users.years_of_experience,
  public.users.bio,
  public.users.linkedin,
  public.users.website,
  public.users.city,
  public.users.interests
FROM
  public.subscriptions
  JOIN public.users ON public.subscriptions.user_id = public.users.id
WHERE
  public.subscriptions.status = 'active'
ORDER BY
  public.subscriptions.current_period_start DESC;


ALTER VIEW "public"."members" OWNER TO "postgres";

-- alter view "public"."members" owner to "authenticated";
-- GRANT
-- SELECT
--   ON "public"."members" TO "anon";
-- GRANT
-- SELECT
--   ON "public"."members" TO "authenticated";
-- GRANT
-- SELECT
--   ON "public"."members" TO "service_role";
-- CREATE POLICY "Allow public read-only access." ON "public"."members" FOR
-- SELECT
--   USING (true);