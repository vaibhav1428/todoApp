-- Table: public.tbl_todo

-- DROP TABLE IF EXISTS public.tbl_todo;

CREATE TABLE IF NOT EXISTS public.tbl_todo
(
    id integer NOT NULL DEFAULT nextval('tbl_todo_id_seq'::regclass),
    task text COLLATE pg_catalog."default" NOT NULL,
    userid integer NOT NULL,
    completed boolean DEFAULT false,
    is_deleted boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    completed_at timestamp without time zone,
    CONSTRAINT tbl_todo_pkey PRIMARY KEY (id),
    CONSTRAINT tbl_todo_userid_fkey FOREIGN KEY (userid)
        REFERENCES public.tbl_users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tbl_todo
    OWNER to postgres;