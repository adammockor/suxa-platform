SET
	session_replication_role = replica;

--
-- PostgreSQL database dump
--
-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.5 (Ubuntu 15.5-1.pgdg20.04+1)
SET
	statement_timeout = 0;

SET
	lock_timeout = 0;

SET
	idle_in_transaction_session_timeout = 0;

SET
	client_encoding = 'UTF8';

SET
	standard_conforming_strings = ON;

SELECT
	pg_catalog.set_config('search_path', '', false);

SET
	check_function_bodies = false;

SET
	xmloption = content;

SET
	client_min_messages = warning;

SET
	row_security = off;

--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
INSERT INTO
	"auth"."users" (
		"instance_id",
		"id",
		"aud",
		"role",
		"email",
		"encrypted_password",
		"email_confirmed_at",
		"invited_at",
		"confirmation_token",
		"confirmation_sent_at",
		"recovery_token",
		"recovery_sent_at",
		"email_change_token_new",
		"email_change",
		"email_change_sent_at",
		"last_sign_in_at",
		"raw_app_meta_data",
		"raw_user_meta_data",
		"is_super_admin",
		"created_at",
		"updated_at",
		"phone",
		"phone_confirmed_at",
		"phone_change",
		"phone_change_token",
		"phone_change_sent_at",
		"email_change_token_current",
		"email_change_confirm_status",
		"banned_until",
		"reauthentication_token",
		"reauthentication_sent_at",
		"is_sso_user",
		"deleted_at"
	)
VALUES
	(
		'00000000-0000-0000-0000-000000000000',
		'cc83eb5c-a340-485e-a304-baae2f4ce8a2',
		'authenticated',
		'authenticated',
		'adam.mockor@gmail.com',
		'$2a$10$6qSmIxq2Fyk6J5OrKmnz5OulP2UQdIimAfttZ5RH0TvqYbIrX.XEi',
		'2024-03-03 18:20:27.090339+00',
		NULL,
		'',
		NULL,
		'',
		'2024-03-03 18:20:27.110886+00',
		'',
		'',
		NULL,
		'2024-03-03 18:20:58.122952+00',
		'{"provider": "email", "providers": ["email"]}',
		'{}',
		NULL,
		'2024-03-03 18:20:27.067644+00',
		'2024-03-03 18:20:58.135005+00',
		NULL,
		NULL,
		'',
		'',
		NULL,
		'',
		0,
		NULL,
		'',
		NULL,
		false,
		NULL
	),
	(
		'00000000-0000-0000-0000-000000000000',
		'454ea705-244b-4db4-903f-84cede540b03',
		'authenticated',
		'authenticated',
		'member@suxa.sk',
		'$2a$10$4RY8wfOh9o7V2Ju8APNKUuwn.H.o7KN/.TvrSnFR8otx4XG/6llZK',
		'2024-03-03 20:44:04.657437+00',
		NULL,
		'',
		NULL,
		'',
		'2024-03-03 20:44:04.673402+00',
		'',
		'',
		NULL,
		'2024-03-03 20:44:41.921804+00',
		'{"provider": "email", "providers": ["email"]}',
		'{}',
		NULL,
		'2024-03-03 20:44:04.644238+00',
		'2024-03-03 20:44:41.923997+00',
		NULL,
		NULL,
		'',
		'',
		NULL,
		'',
		0,
		NULL,
		'',
		NULL,
		false,
		NULL
	);

--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
INSERT INTO
	"auth"."identities" (
		"provider_id",
		"user_id",
		"identity_data",
		"provider",
		"last_sign_in_at",
		"created_at",
		"updated_at",
		"id"
	)
VALUES
	(
		'cc83eb5c-a340-485e-a304-baae2f4ce8a2',
		'cc83eb5c-a340-485e-a304-baae2f4ce8a2',
		'{"sub": "cc83eb5c-a340-485e-a304-baae2f4ce8a2", "email": "adam.mockor@gmail.com", "email_verified": false, "phone_verified": false}',
		'email',
		'2024-03-03 18:20:27.086796+00',
		'2024-03-03 18:20:27.086845+00',
		'2024-03-03 18:20:27.086845+00',
		'86212738-878a-4037-8b20-21f6a5b22bbd'
	),
	(
		'454ea705-244b-4db4-903f-84cede540b03',
		'454ea705-244b-4db4-903f-84cede540b03',
		'{"sub": "454ea705-244b-4db4-903f-84cede540b03", "email": "member@suxa.sk", "email_verified": false, "phone_verified": false}',
		'email',
		'2024-03-03 20:44:04.6559+00',
		'2024-03-03 20:44:04.655944+00',
		'2024-03-03 20:44:04.655944+00',
		'a5d312f0-383a-46b1-8067-4efb2e46ed3a'
	);

--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
	"public"."customers" ("id", "stripe_customer_id")
VALUES
	(
		'cc83eb5c-a340-485e-a304-baae2f4ce8a2',
		'cus_Pff0nzBybL8EmS'
	),
	(
		'454ea705-244b-4db4-903f-84cede540b03',
		'cus_PfhJQ3VWC42v4m'
	);

--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
	"public"."products" (
		"id",
		"active",
		"name",
		"description",
		"image",
		"metadata"
	)
VALUES
	(
		'prod_PfetHZexsaB1VB',
		TRUE,
		'Členske',
		NULL,
		NULL,
		'{}'
	);

--
-- Data for Name: prices; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
	"public"."prices" (
		"id",
		"product_id",
		"active",
		"description",
		"unit_amount",
		"currency",
		"type",
		"interval",
		"interval_count",
		"trial_period_days",
		"metadata"
	)
VALUES
	(
		'price_1OqJa8CXlKYfP6nJY7u4xfef',
		'prod_PfetHZexsaB1VB',
		TRUE,
		NULL,
		500,
		'eur',
		'recurring',
		'year',
		1,
		NULL,
		'{}'
	),
	(
		'price_1OqJa8CXlKYfP6nJXyfdgAdm',
		'prod_PfetHZexsaB1VB',
		TRUE,
		NULL,
		2000,
		'eur',
		'recurring',
		'year',
		1,
		NULL,
		'{}'
	),
	(
		'price_1OqJa8CXlKYfP6nJr9xCAQ6J',
		'prod_PfetHZexsaB1VB',
		TRUE,
		NULL,
		5000,
		'eur',
		'recurring',
		'year',
		1,
		NULL,
		'{}'
	);

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
	"public"."users" (
		"id",
		"avatar_url",
		"billing_address",
		"payment_method",
		"bio",
		"city",
		"email_visible",
		"expectations",
		"gdpr_consent",
		"interests",
		"job_role",
		"linkedin",
		"name",
		"organization",
		"surename",
		"website",
		"years_of_experience"
	)
VALUES
	(
		'cc83eb5c-a340-485e-a304-baae2f4ce8a2',
		NULL,
		NULL,
		NULL,
		'Nieco o mne',
		'Bratislava - Ružinov',
		TRUE,
		'',
		TRUE,
		'',
		'Developer',
		'',
		'Adam',
		'Lighting Beetle s.r.o.',
		'Močkoř',
		'',
		10
	),
	(
		'454ea705-244b-4db4-903f-84cede540b03',
		NULL,
		NULL,
		NULL,
		'',
		'',
		false,
		'',
		TRUE,
		'',
		'UI dizajnér',
		'',
		'Member',
		'',
		'Membersky',
		'',
		NULL
	);

--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
	"public"."subscriptions" (
		"id",
		"user_id",
		"status",
		"metadata",
		"price_id",
		"quantity",
		"cancel_at_period_end",
		"created",
		"current_period_start",
		"current_period_end",
		"ended_at",
		"cancel_at",
		"canceled_at",
		"trial_start",
		"trial_end"
	)
VALUES
	(
		'sub_1OqJhOCXlKYfP6nJUMHUaj1i',
		'cc83eb5c-a340-485e-a304-baae2f4ce8a2',
		'active',
		'{}',
		'price_1OqJa8CXlKYfP6nJY7u4xfef',
		1,
		false,
		'2024-03-03 18:53:46+00',
		'2024-03-03 18:53:46+00',
		'2025-03-03 18:53:46+00',
		NULL,
		NULL,
		NULL,
		NULL,
		NULL
	),
	(
		'sub_1OqLveCXlKYfP6nJI2NjZ0UG',
		'454ea705-244b-4db4-903f-84cede540b03',
		'active',
		'{}',
		'price_1OqJa8CXlKYfP6nJY7u4xfef',
		1,
		false,
		'2024-03-03 21:16:38+00',
		'2024-03-03 21:16:38+00',
		'2025-03-03 21:16:38+00',
		NULL,
		NULL,
		NULL,
		NULL,
		NULL
	);

--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
	"public"."user_roles" ("id", "user_id", "role")
VALUES
	(
		'1',
		'cc83eb5c-a340-485e-a304-baae2f4ce8a2',
		'admin'
	);

--
-- PostgreSQL database dump complete
--
RESET ALL;