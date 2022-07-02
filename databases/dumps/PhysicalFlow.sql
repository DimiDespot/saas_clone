--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

-- Started on 2022-06-30 20:22:16 EEST

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
-- TOC entry 209 (class 1259 OID 16511)
-- Name: Area; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Area" (
    "AreaName" character varying(30) NOT NULL,
    "Country" character varying(30) NOT NULL,
    "MapCode" character varying(30) NOT NULL
);


ALTER TABLE public."Area" OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16544)
-- Name: PhysicalFlow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PhysicalFlow" (
    "DateTime" timestamp without time zone NOT NULL,
    "OutAreaName" character varying(30) NOT NULL,
    "InAreaName" character varying(30) NOT NULL,
    "FlowValue" numeric(10,2) NOT NULL
);


ALTER TABLE public."PhysicalFlow" OWNER TO postgres;

--
-- TOC entry 3576 (class 0 OID 16511)
-- Dependencies: 209
-- Data for Name: Area; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Area" ("AreaName", "Country", "MapCode") FROM stdin;
\.


--
-- TOC entry 3577 (class 0 OID 16544)
-- Dependencies: 210
-- Data for Name: PhysicalFlow; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PhysicalFlow" ("DateTime", "OutAreaName", "InAreaName", "FlowValue") FROM stdin;
\.


--
-- TOC entry 3434 (class 2606 OID 16515)
-- Name: Area Area_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Area"
    ADD CONSTRAINT "Area_pkey" PRIMARY KEY ("AreaName");


--
-- TOC entry 3436 (class 2606 OID 16548)
-- Name: PhysicalFlow PhysicalFlow_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PhysicalFlow"
    ADD CONSTRAINT "PhysicalFlow_pkey" PRIMARY KEY ("DateTime", "OutAreaName", "InAreaName");


-- Completed on 2022-06-30 20:22:17 EEST

--
-- PostgreSQL database dump complete
--

