--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

-- Started on 2022-06-30 20:31:19 EEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 16494)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    "Email" character varying(30) NOT NULL,
    "FirstName" character varying(30) NOT NULL,
    "LastName" character varying(30) NOT NULL,
    "LastLogin" timestamp without time zone NOT NULL,
    "DaysLeft" integer NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 3570 (class 0 OID 16494)
-- Dependencies: 209
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" ("Email", "FirstName", "LastName", "LastLogin", "DaysLeft") FROM stdin;
\.


--
-- TOC entry 3430 (class 2606 OID 16498)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("Email");


-- Completed on 2022-06-30 20:31:19 EEST

--
-- PostgreSQL database dump complete
--

