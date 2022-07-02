--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

-- Started on 2022-06-30 20:25:30 EEST

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
-- TOC entry 210 (class 1259 OID 16539)
-- Name: AggregatedGenerationPerType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AggregatedGenerationPerType" (
    "DateTime" timestamp without time zone NOT NULL,
    "AreaName" character varying(30) NOT NULL,
    "ProductionType" character varying(30) NOT NULL,
    "ActualGenerationOutput" numeric(10,2)
);


ALTER TABLE public."AggregatedGenerationPerType" OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16522)
-- Name: Area; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Area" (
    "AreaName" character varying(30) NOT NULL,
    "Country" character varying(30) NOT NULL,
    "MapCode" character varying(30) NOT NULL
);


ALTER TABLE public."Area" OWNER TO postgres;

--
-- TOC entry 3577 (class 0 OID 16539)
-- Dependencies: 210
-- Data for Name: AggregatedGenerationPerType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AggregatedGenerationPerType" ("DateTime", "AreaName", "ProductionType", "ActualGenerationOutput") FROM stdin;
\.


--
-- TOC entry 3576 (class 0 OID 16522)
-- Dependencies: 209
-- Data for Name: Area; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Area" ("AreaName", "Country", "MapCode") FROM stdin;
\.


--
-- TOC entry 3436 (class 2606 OID 16543)
-- Name: AggregatedGenerationPerType AggregatedGenerationPerType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AggregatedGenerationPerType"
    ADD CONSTRAINT "AggregatedGenerationPerType_pkey" PRIMARY KEY ("DateTime", "AreaName", "ProductionType");


--
-- TOC entry 3434 (class 2606 OID 16526)
-- Name: Area Area_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Area"
    ADD CONSTRAINT "Area_pkey" PRIMARY KEY ("AreaName");


-- Completed on 2022-06-30 20:25:31 EEST

--
-- PostgreSQL database dump complete
--

