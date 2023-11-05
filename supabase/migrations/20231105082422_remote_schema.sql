alter table "public"."prices" drop constraint "prices_product_id_fkey";

alter table "public"."subscriptions" drop constraint "subscriptions_user_id_fkey";

alter table "public"."users" drop column "full_name";

alter table "public"."users" add column "bio" text;

alter table "public"."users" add column "city" text;

alter table "public"."users" add column "email" character varying;

alter table "public"."users" add column "email_visible" boolean default true;

alter table "public"."users" add column "expectations" text;

alter table "public"."users" add column "gdpr_consent" boolean;

alter table "public"."users" add column "interests" text;

alter table "public"."users" add column "job_role" text;

alter table "public"."users" add column "linkedin" text;

alter table "public"."users" add column "name" text;

alter table "public"."users" add column "organization" text;

alter table "public"."users" add column "surename" text;

alter table "public"."users" add column "website" text;

alter table "public"."users" add column "years_of_experience" smallint;

alter table "public"."prices" add constraint "prices_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE not valid;

alter table "public"."prices" validate constraint "prices_product_id_fkey";

alter table "public"."subscriptions" add constraint "subscriptions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."subscriptions" validate constraint "subscriptions_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.users (id)
  values (new.id);
  return new;
end;
$function$
;


