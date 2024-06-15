-- Table: public.tbl_password_setup

-- DROP TABLE IF EXISTS public.tbl_password_setup;

CREATE TABLE IF NOT EXISTS public.tbl_password_setup
(
    id integer NOT NULL DEFAULT nextval('tbl_password_setup_id_seq'::regclass),
    token character varying(255) COLLATE pg_catalog."default" NOT NULL,
    userid integer NOT NULL,
    is_expired boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT tbl_password_setup_pkey PRIMARY KEY (id),
    CONSTRAINT tbl_password_setup_userid_fkey FOREIGN KEY (userid)
        REFERENCES public.tbl_users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tbl_password_setup
    OWNER to postgres;