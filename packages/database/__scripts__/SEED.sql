INSERT INTO organization(name)
VALUES ('IEDC MEC');
INSERT INTO organization(name)
VALUES ('FOSS MEC');

INSERT INTO "user"(name, email, password)
VALUES ('Allen', 'allen@email.com', 'pass');
INSERT INTO "user"(name, email, password)
VALUES ('Aldrin', 'aldrin@email.com', 'star emoji');
INSERT INTO "user"(name, email, password)
VALUES ('Jaison', 'jaison@email.com', 'json');
INSERT INTO "user"(name, email, password)
VALUES ('Subramani', 'subru@email.com', 'frontend main');
INSERT INTO "user"(name, email, password)
VALUES ('Jithin', 'jithin@email.com', 'no idea');
INSERT INTO "user"(name, email, password)
VALUES ('Jozef', 'jozef@email.com', 'tailwind fenboy');

INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE name = 'Allen'),
        (SELECT id FROM available_roles WHERE name = 'admin'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE name = 'Allen'),
        (SELECT id FROM available_roles WHERE name = 'onsite'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE name = 'Aldrin'),
        (SELECT id FROM available_roles WHERE name = 'owner'));
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE name = 'Aldrin'),
        (SELECT id FROM available_roles WHERE name = 'admin'));
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE name = 'Aldrin'),
        (SELECT id FROM available_roles WHERE name = 'onsite'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE name = 'Jaison'),
        (SELECT id FROM available_roles WHERE name = 'admin'));
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE name = 'Jaison'),
        (SELECT id FROM available_roles WHERE name = 'onsite'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE name = 'Subramani'),
        (SELECT id FROM available_roles WHERE name = 'admin'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE name = 'Subramani'),
        (SELECT id FROM available_roles WHERE name = 'onsite'));

INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'FOSS MEC'),
        (SELECT id FROM "user" WHERE name = 'Jithin'),
        (SELECT id FROM available_roles WHERE name = 'owner'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'FOSS MEC'),
        (SELECT id FROM "user" WHERE name = 'Jithin'),
        (SELECT id FROM available_roles WHERE name = 'admin'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'FOSS MEC'),
        (SELECT id FROM "user" WHERE name = 'Jithin'),
        (SELECT id FROM available_roles WHERE name = 'onsite'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'FOSS MEC'),
        (SELECT id FROM "user" WHERE name = 'Jozef'),
        (SELECT id FROM available_roles WHERE name = 'admin'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'FOSS MEC'),
        (SELECT id FROM "user" WHERE name = 'Jozef'),
        (SELECT id FROM available_roles WHERE name = 'onsite'));

INSERT INTO "user"(name, email, password)
VALUES ('checkinbot', 'checkinbot@email.com', 'bro is a bot');

INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE name = 'checkinbot'),
        (SELECT id FROM available_roles WHERE name = 'onsite'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'FOSS MEC'),
        (SELECT id FROM "user" WHERE name = 'checkinbot'),
        (SELECT id FROM available_roles WHERE name = 'onsite'));

INSERT INTO event(organization_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'), 'Technohack');
INSERT INTO event(organization_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'), 'Technoprenuer Day 1');
INSERT INTO event(organization_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'), 'Technoprenuer Day 2');

INSERT INTO event(organization_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'FOSS MEC'), 'DebUtsav');

INSERT INTO available_extras(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technohack'), 'Tea');
INSERT INTO available_extras(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technohack'), 'Dinner');
INSERT INTO available_extras(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technohack'), 'Breakfast');
INSERT INTO available_extras(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technohack'), 'Lunch');

INSERT INTO available_extras(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Workshop 1');
INSERT INTO available_extras(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Workshop 2');
INSERT INTO available_extras(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Workshop 3');
INSERT INTO available_extras(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Workshop 4');
INSERT INTO available_extras(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Veg Lunch');
INSERT INTO available_extras(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Non Veg Lunch');
INSERT INTO available_extras(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Workshop 5');
INSERT INTO available_extras(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Workshop 6');
INSERT INTO available_extras(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Workshop 7');
INSERT INTO available_extras(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Workshop 8');

INSERT INTO available_extras(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 2'), 'Veg Lunch');
INSERT INTO available_extras(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 2'), 'Non Veg Lunch');
INSERT INTO available_extras(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 2'), 'Tea');
INSERT INTO available_extras(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 2'), 'Iftaar Box');

INSERT INTO available_attributes(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'FOSS MEC'),
        (SELECT id FROM event WHERE name = 'DebUtsav'), 'T-Shirt Size');

INSERT INTO participant(organization_id, event_id, first_name, last_name, invite_id)
VALUES ((SELECT id FROM organization WHERE name = 'FOSS MEC'), (SELECT id FROM event WHERE name = 'DebUtsav'),
        'James', 'Bond', '007');