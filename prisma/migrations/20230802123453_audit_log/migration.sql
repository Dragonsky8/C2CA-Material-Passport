-- This is an empty migration.
CREATE OR REPLACE FUNCTION "audit"."Material_audit"() RETURNS TRIGGER AS $$
    BEGIN
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO "audit"."MaterialVersion"
            VALUES (DEFAULT, 'DELETE', NULL, current_setting('app.current_user_id', TRUE)::int, now(), OLD.*);
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO "audit"."MaterialVersion"
            VALUES (DEFAULT, 'UPDATE', NEW."id", current_setting('app.current_user_id', TRUE)::int, now(), NEW.*);
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO "audit"."MaterialVersion"
            VALUES (DEFAULT, 'INSERT', NEW."id", current_setting('app.current_user_id', TRUE)::int, now(), NEW.*);
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit
AFTER INSERT OR UPDATE OR DELETE ON "public"."Material"
    FOR EACH ROW EXECUTE FUNCTION "audit"."Material_audit"();