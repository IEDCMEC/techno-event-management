DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS organization CASCADE;
DROP TABLE IF EXISTS organization_user CASCADE;
DROP TABLE IF EXISTS subscription CASCADE;
DROP TABLE IF EXISTS organization_subscription CASCADE;
DROP TABLE IF EXISTS event_volunteer CASCADE;

DROP TABLE IF EXISTS event CASCADE;
DROP TABLE IF EXISTS participant CASCADE;
DROP TABLE IF EXISTS tag CASCADE;
DROP TABLE IF EXISTS participant_tag CASCADE;
DROP TABLE IF EXISTS participant_check_in CASCADE;
DROP TABLE IF EXISTS attribute CASCADE;
DROP TABLE IF EXISTS participant_attribute CASCADE;
DROP TABLE IF EXISTS extra CASCADE;
DROP TABLE IF EXISTS participant_extras CASCADE;
DROP TABLE IF EXISTS participant_extras_check_in CASCADE;
-- DROP TABLE IF EXISTS team CASCADE;
-- DROP TABLE IF EXISTS team_member CASCADE;
-- DROP TABLE IF EXISTS team_check_in CASCADE;
-- DROP TABLE IF EXISTS team_tag CASCADE;
-- DROP TABLE IF EXISTS team_attribute CASCADE;
-- DROP TABLE IF EXISTS team_extras CASCADE;
-- DROP TABLE IF EXISTS team_extras_check_in CASCADE;


CREATE TABLE IF NOT EXISTS "user"
(
    id       UUID DEFAULT uuid_generate_v4(),

    name     VARCHAR(255) NOT NULL,
    email    VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS role
(
    id   UUID DEFAULT uuid_generate_v4(),

    name VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization
(
    id   UUID DEFAULT uuid_generate_v4(),

    name VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization_user
(
    id              UUID DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL,
    organization_id UUID NOT NULL,

    role_id         UUID NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (role_id) REFERENCES role (id)
);

CREATE TABLE IF NOT EXISTS subscription
(
    id    UUID DEFAULT uuid_generate_v4(),

    name  VARCHAR(255) NOT NULL,
    price INTEGER      NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization_subscription
(
    id              UUID DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL,

    subscription_id UUID NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (subscription_id) REFERENCES subscription (id)
);


CREATE TABLE IF NOT EXISTS event
(
    id              UUID DEFAULT uuid_generate_v4(),
    organization_id UUID         NOT NULL,

    name            VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (organization_id) REFERENCES organization (id)
);

CREATE TABLE IF NOT EXISTS participant
(
    id              UUID DEFAULT uuid_generate_v4(),
    organization_id UUID         NOT NULL,
    event_id        UUID         NOT NULL,

    first_name      VARCHAR(255) NOT NULL,
    last_name       VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (event_id) REFERENCES event (id)
);

CREATE TABLE IF NOT EXISTS tag
(
    id              UUID DEFAULT uuid_generate_v4(),
    organization_id UUID         NOT NULL,
    event_id        UUID         NOT NULL,

    tag             VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (event_id) REFERENCES event (id)
);

CREATE TABLE IF NOT EXISTS participant_tag
(
    id              UUID DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL,
    event_id        UUID NOT NULL,

    tag_id          UUID NOT NULL,
    participant_id  UUID NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (event_id) REFERENCES event (id),
    FOREIGN KEY (tag_id) REFERENCES tag (id),
    FOREIGN KEY (participant_id) REFERENCES participant (id)
);

CREATE TABLE IF NOT EXISTS participant_check_in
(
    id              UUID               DEFAULT uuid_generate_v4(),
    organization_id UUID      NOT NULL,
    event_id        UUID      NOT NULL,

    participant_id  UUID      NOT NULL,

    checked_in      BOOLEAN   NOT NULL DEFAULT FALSE,
    check_in_time   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    checked_in_by   UUID      NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (participant_id) REFERENCES participant (id),
    FOREIGN KEY (checked_in_by) REFERENCES "user" (id)
);

CREATE TABLE IF NOT EXISTS attribute
(
    id              UUID DEFAULT uuid_generate_v4(),
    organization_id UUID         NOT NULL,
    event_id        UUID         NOT NULL,

    name            VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (event_id) REFERENCES event (id)
);

CREATE TABLE IF NOT EXISTS participant_attribute
(
    id              UUID DEFAULT uuid_generate_v4(),
    organization_id UUID         NOT NULL,
    event_id        UUID         NOT NULL,

    attribute_id    UUID         NOT NULL,
    participant_id  UUID         NOT NULL,

    value           VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (attribute_id) REFERENCES attribute (id),
    FOREIGN KEY (participant_id) REFERENCES participant (id)
);

CREATE TABLE IF NOT EXISTS extra
(
    id              UUID DEFAULT uuid_generate_v4(),
    organization_id UUID         NOT NULL,
    event_id        UUID         NOT NULL,

    name            VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (event_id) REFERENCES event (id)
);

CREATE TABLE IF NOT EXISTS participant_extras
(
    id              UUID DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL,
    event_id        UUID NOT NULL,

    extra_id        UUID NOT NULL,
    participant_id  UUID NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (extra_id) REFERENCES extra (id),
    FOREIGN KEY (participant_id) REFERENCES participant (id)
);

CREATE TABLE IF NOT EXISTS participant_extras_check_in
(
    id                   UUID               DEFAULT uuid_generate_v4(),
    organization_id      UUID      NOT NULL,
    event_id             UUID      NOT NULL,

    participant_extra_id UUID      NOT NULL,

    checked_in           BOOLEAN   NOT NULL DEFAULT FALSE,
    check_in_time        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    checked_in_by        UUID      NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (participant_extra_id) REFERENCES participant_extras (id),
    FOREIGN KEY (checked_in_by) REFERENCES "user" (id)
);

CREATE TABLE IF NOT EXISTS event_volunteer
(
    id                   UUID DEFAULT uuid_generate_v4(),
    organization_id      UUID NOT NULL,
    event_id             UUID NOT NULL,
    user_id              UUID NOT NULL,

    organization_user_id UUID NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (organization_id) REFERENCES event (id),
    FOREIGN KEY (organization_user_id) REFERENCES organization_user (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);
--
-- CREATE TABLE IF NOT EXISTS team
--
-- (
--     id              UUID DEFAULT uuid_generate_v4(),
--     organization_id UUID         NOT NULL,
--     event_id        UUID         NOT NULL,
--
--     name            VARCHAR(255) NOT NULL,
--
--     PRIMARY KEY (id),
--     FOREIGN KEY (organization_id) REFERENCES organization (id),
--     FOREIGN KEY (event_id) REFERENCES event (id)
-- );
--
-- CREATE TABLE IF NOT EXISTS team_member
-- (
--     id              UUID DEFAULT uuid_generate_v4(),
--     organization_id UUID NOT NULL,
--     event_id        UUID NOT NULL,
--
--     team_id         UUID NOT NULL,
--     participant_id  UUID NOT NULL,
--
--     PRIMARY KEY (id),
--     FOREIGN KEY (organization_id) REFERENCES organization (id),
--     FOREIGN KEY (event_id) REFERENCES event (id),
--     FOREIGN KEY (team_id) REFERENCES team (id),
--     FOREIGN KEY (participant_id) REFERENCES participant (id)
-- );
--
-- CREATE TABLE IF NOT EXISTS team_tag
-- (
--     id              UUID DEFAULT uuid_generate_v4(),
--     organization_id UUID NOT NULL,
--     event_id        UUID NOT NULL,
--
--     tag_id          UUID NOT NULL,
--     team_id         UUID NOT NULL,
--
--     PRIMARY KEY (id),
--     FOREIGN KEY (organization_id) REFERENCES organization (id),
--     FOREIGN KEY (event_id) REFERENCES event (id),
--     FOREIGN KEY (tag_id) REFERENCES tag (id),
--     FOREIGN KEY (team_id) REFERENCES team (id)
-- );
--
-- CREATE TABLE IF NOT EXISTS team_check_in
-- (
--     id              UUID               DEFAULT uuid_generate_v4(),
--     organization_id UUID      NOT NULL,
--     event_id        UUID      NOT NULL,
--
--     team_id         UUID      NOT NULL,
--
--     checked_in      BOOLEAN   NOT NULL DEFAULT FALSE,
--     check_in_time   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     checked_in_by   UUID      NOT NULL,
--
--     PRIMARY KEY (id),
--     FOREIGN KEY (organization_id) REFERENCES organization (id),
--     FOREIGN KEY (team_id) REFERENCES team (id),
--     FOREIGN KEY (checked_in_by) REFERENCES "user" (id)
-- );
--
-- CREATE TABLE IF NOT EXISTS team_attribute
-- (
--     id              UUID DEFAULT uuid_generate_v4(),
--     organization_id UUID         NOT NULL,
--     event_id        UUID         NOT NULL,
--
--     attribute_id    UUID         NOT NULL,
--     team_id         UUID         NOT NULL,
--
--     value           VARCHAR(255) NOT NULL,
--
--     PRIMARY KEY (id),
--     FOREIGN KEY (organization_id) REFERENCES organization (id),
--     FOREIGN KEY (attribute_id) REFERENCES attribute (id),
--     FOREIGN KEY (team_id) REFERENCES team (id)
-- );
--
-- CREATE TABLE IF NOT EXISTS team_extras
-- (
--     id              UUID DEFAULT uuid_generate_v4(),
--     organization_id UUID         NOT NULL,
--     event_id        UUID         NOT NULL,
--
--     extra_id        UUID         NOT NULL,
--     team_id         UUID         NOT NULL,
--
--     value           VARCHAR(255) NOT NULL,
--
--     PRIMARY KEY (id),
--     FOREIGN KEY (organization_id) REFERENCES organization (id),
--     FOREIGN KEY (extra_id) REFERENCES extra (id),
--     FOREIGN KEY (team_id) REFERENCES team (id)
-- );
--
-- CREATE TABLE IF NOT EXISTS team_extras_check_in
-- (
--     id              UUID               DEFAULT uuid_generate_v4(),
--     organization_id UUID      NOT NULL,
--     event_id        UUID      NOT NULL,
--
--     team_extra_id   UUID      NOT NULL,
--
--     checked_in      BOOLEAN   NOT NULL DEFAULT FALSE,
--     check_in_time   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     checked_in_by   UUID      NOT NULL,
--
--     PRIMARY KEY (id),
--     FOREIGN KEY (organization_id) REFERENCES organization (id),
--     FOREIGN KEY (team_extra_id) REFERENCES team_extras (id),
--     FOREIGN KEY (checked_in_by) REFERENCES "user" (id)
-- );
