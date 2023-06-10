DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS available_roles CASCADE;
DROP TABLE IF EXISTS organization CASCADE;
DROP TABLE IF EXISTS organization_user CASCADE;
DROP TABLE IF EXISTS available_subscriptions CASCADE;
DROP TABLE IF EXISTS organization_subscription CASCADE;

DROP TABLE IF EXISTS event CASCADE;
DROP TABLE IF EXISTS participant CASCADE;
DROP TABLE IF EXISTS available_tags CASCADE;
DROP TABLE IF EXISTS participant_tag CASCADE;
DROP TABLE IF EXISTS participant_check_in CASCADE;
DROP TABLE IF EXISTS available_attributes CASCADE;
DROP TABLE IF EXISTS participant_attribute CASCADE;
DROP TABLE IF EXISTS available_extras CASCADE;
DROP TABLE IF EXISTS participant_extras CASCADE;
DROP TABLE IF EXISTS participant_extras_check_in CASCADE;

CREATE TABLE IF NOT EXISTS "user"
(
    id       uuid DEFAULT uuid_generate_v4(),

    name     VARCHAR(255) NOT NULL,
    email    VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS available_roles
(
    id   uuid DEFAULT uuid_generate_v4(),

    name VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization
(
    id   uuid DEFAULT uuid_generate_v4(),

    name VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization_user
(
    id              uuid DEFAULT uuid_generate_v4(),
    user_id         uuid NOT NULL,
    organization_id uuid NOT NULL,

    role_id         uuid NOT NULL,

    PRIMARY KEY (id, user_id, organization_id),
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (role_id) REFERENCES available_roles (id)
);

CREATE TABLE IF NOT EXISTS available_subscriptions
(
    id    uuid DEFAULT uuid_generate_v4(),

    name  VARCHAR(255) NOT NULL,
    price INTEGER      NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization_subscription
(
    id              uuid DEFAULT uuid_generate_v4(),
    organization_id uuid NOT NULL,

    subscription_id uuid NOT NULL,

    PRIMARY KEY (id, organization_id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (subscription_id) REFERENCES available_subscriptions (id)
);


CREATE TABLE IF NOT EXISTS event
(
    id              uuid DEFAULT uuid_generate_v4(),
    organization_id uuid         NOT NULL,

    name            VARCHAR(255) NOT NULL,

    PRIMARY KEY (id, organization_id),
    FOREIGN KEY (organization_id) REFERENCES organization (id)
);

CREATE TABLE IF NOT EXISTS participant
(
    id              uuid DEFAULT uuid_generate_v4(),
    organization_id uuid         NOT NULL,
    event_id        uuid         NOT NULL,

    first_name      VARCHAR(255) NOT NULL,
    last_name       VARCHAR(255) NOT NULL,
    invite_id       VARCHAR(255) NOT NULL,

    PRIMARY KEY (id, organization_id, event_id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (event_id, organization_id) REFERENCES event (id, organization_id)
);

CREATE TABLE IF NOT EXISTS available_tags
(
    id              uuid DEFAULT uuid_generate_v4(),
    organization_id uuid         NOT NULL,
    event_id        uuid         NOT NULL,

    tag             VARCHAR(255) NOT NULL,

    PRIMARY KEY (id, organization_id, event_id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (event_id, organization_id) REFERENCES event (id, organization_id)
);

CREATE TABLE IF NOT EXISTS participant_tag
(
    id              uuid DEFAULT uuid_generate_v4(),
    organization_id uuid NOT NULL,
    event_id        uuid NOT NULL,

    tag_id          uuid NOT NULL,
    participant_id  uuid NOT NULL,

    PRIMARY KEY (id, organization_id, event_id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (organization_id, event_id) REFERENCES event (organization_id, id),
    FOREIGN KEY (tag_id, organization_id, event_id) REFERENCES available_tags (id, organization_id, event_id),
    FOREIGN KEY (participant_id, organization_id, event_id) REFERENCES participant (id, organization_id, event_id)
);

CREATE TABLE IF NOT EXISTS participant_check_in
(
    id              uuid               DEFAULT uuid_generate_v4(),
    organization_id uuid      NOT NULL,
    event_id        uuid      NOT NULL,

    participant_id  uuid      NOT NULL,

    checked_in      BOOLEAN   NOT NULL DEFAULT FALSE,
    check_in_time   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    checked_in_by   uuid      NOT NULL,

    PRIMARY KEY (id, organization_id, event_id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (participant_id, organization_id, event_id) REFERENCES participant (id, organization_id, event_id),
    FOREIGN KEY (checked_in_by) REFERENCES "user" (id)
);

CREATE TABLE IF NOT EXISTS available_attributes
(
    id              uuid DEFAULT uuid_generate_v4(),
    organization_id uuid         NOT NULL,
    event_id        uuid         NOT NULL,

    name            VARCHAR(255) NOT NULL,

    PRIMARY KEY (id, organization_id, event_id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (event_id, organization_id) REFERENCES event (id, organization_id)
);

CREATE TABLE IF NOT EXISTS participant_attribute
(
    id              uuid DEFAULT uuid_generate_v4(),
    organization_id uuid         NOT NULL,
    event_id        uuid         NOT NULL,

    attribute_id    uuid         NOT NULL,
    participant_id  uuid         NOT NULL,

    value           VARCHAR(255) NOT NULL,

    PRIMARY KEY (id, organization_id, event_id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (attribute_id, organization_id, event_id) REFERENCES available_attributes (id, organization_id, event_id),
    FOREIGN KEY (participant_id, organization_id, event_id) REFERENCES participant (id, organization_id, event_id)
);

CREATE TABLE IF NOT EXISTS available_extras
(
    id              uuid DEFAULT uuid_generate_v4(),
    organization_id uuid         NOT NULL,
    event_id        uuid         NOT NULL,

    name            VARCHAR(255) NOT NULL,

    PRIMARY KEY (id, organization_id, event_id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (event_id, organization_id) REFERENCES event (id, organization_id)
);

CREATE TABLE IF NOT EXISTS participant_extras
(
    id              uuid DEFAULT uuid_generate_v4(),
    organization_id uuid NOT NULL,
    event_id        uuid NOT NULL,

    extra_id        uuid NOT NULL,
    participant_id  uuid NOT NULL,

    PRIMARY KEY (id, organization_id, event_id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (extra_id, organization_id, event_id) REFERENCES available_extras (id, organization_id, event_id),
    FOREIGN KEY (participant_id, organization_id, event_id) REFERENCES participant (id, organization_id, event_id)
);

CREATE TABLE IF NOT EXISTS participant_extras_check_in
(
    id                   uuid               DEFAULT uuid_generate_v4(),
    organization_id      uuid      NOT NULL,
    event_id             uuid      NOT NULL,

    participant_extra_id uuid      NOT NULL,

    checked_in           BOOLEAN   NOT NULL DEFAULT FALSE,
    check_in_time        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    checked_in_by        uuid      NOT NULL,

    PRIMARY KEY (id, organization_id, event_id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (participant_extra_id, organization_id, event_id) REFERENCES participant_extras (id, organization_id, event_id),
    FOREIGN KEY (checked_in_by) REFERENCES "user" (id)
);

CREATE TABLE IF NOT EXISTS event_volunteer
(
    id                   uuid DEFAULT uuid_generate_v4(),
    organization_id      uuid NOT NULL,
    event_id             uuid NOT NULL,
    user_id              uuid NOT NULL,

    organization_user_id uuid NOT NULL,

    PRIMARY KEY (id, organization_id, event_id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (organization_id, event_id) REFERENCES event (id, organization_id),
    FOREIGN KEY (organization_user_id, user_id, organization_id) REFERENCES organization_user (id, user_id, organization_id),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);
