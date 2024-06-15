-- Table: public.tbl_users

-- DROP TABLE IF EXISTS public.tbl_users;

CREATE TABLE IF NOT EXISTS public.tbl_users
(
    id integer NOT NULL DEFAULT nextval('tbl_users_id_seq'::regclass),
    fullname character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default",
    password_set boolean DEFAULT false,
    mobile_code character varying(5) COLLATE pg_catalog."default" NOT NULL,
    mobile_no character varying(15) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT tbl_users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tbl_users
    OWNER to postgres;