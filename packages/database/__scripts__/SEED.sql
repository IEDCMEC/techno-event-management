INSERT INTO "user"(first_name, last_name, email, password)
VALUES ('Allen', 'Allen', 'allen@email.com', 'pass');
INSERT INTO "user"(first_name, last_name, email, password)
VALUES ('Aldrin', 'Aldrin', 'aldrin@email.com', 'star emoji');
INSERT INTO "user"(first_name, last_name, email, password)
VALUES ('Jaison', 'Jaison', 'jaison@email.com', 'json');
INSERT INTO "user"(first_name, last_name, email, password)
VALUES ('Subramani', 'Subramani', 'subru@email.com', 'frontend main');
INSERT INTO "user"(first_name, last_name, email, password)
VALUES ('Jithin', 'Jithin', 'jithin@email.com', 'no idea');
INSERT INTO "user"(first_name, last_name, email, password)
VALUES ('Jozef', 'Jozef', 'jozef@email.com', 'tailwind fenboy');

INSERT INTO organization(name, owner_id)
VALUES ('IEDC MEC', (SELECT id FROM "user" WHERE email = 'aldrin@email.com'));
INSERT INTO organization(name, owner_id)
VALUES ('FOSS MEC', (SELECT id FROM "user" WHERE email = 'jithin@email.com'));

INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE first_name = 'Allen'),
        (SELECT id FROM role WHERE name = 'ROLE_ADMIN'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE first_name = 'Allen'),
        (SELECT id FROM role WHERE name = 'ROLE_ONSITE'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE first_name = 'Aldrin'),
        (SELECT id FROM role WHERE name = 'ROLE_OWNER'));
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE first_name = 'Aldrin'),
        (SELECT id FROM role WHERE name = 'ROLE_ADMIN'));
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE first_name = 'Aldrin'),
        (SELECT id FROM role WHERE name = 'ROLE_ONSITE'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE first_name = 'Jaison'),
        (SELECT id FROM role WHERE name = 'ROLE_ADMIN'));
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE first_name = 'Jaison'),
        (SELECT id FROM role WHERE name = 'ROLE_ONSITE'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE first_name = 'Subramani'),
        (SELECT id FROM role WHERE name = 'ROLE_ADMIN'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE first_name = 'Subramani'),
        (SELECT id FROM role WHERE name = 'ROLE_ONSITE'));

INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'FOSS MEC'),
        (SELECT id FROM "user" WHERE first_name = 'Jithin'),
        (SELECT id FROM role WHERE name = 'ROLE_OWNER'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'FOSS MEC'),
        (SELECT id FROM "user" WHERE first_name = 'Jithin'),
        (SELECT id FROM role WHERE name = 'ROLE_ADMIN'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'FOSS MEC'),
        (SELECT id FROM "user" WHERE first_name = 'Jithin'),
        (SELECT id FROM role WHERE name = 'ROLE_ONSITE'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'FOSS MEC'),
        (SELECT id FROM "user" WHERE first_name = 'Jozef'),
        (SELECT id FROM role WHERE name = 'ROLE_ADMIN'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'FOSS MEC'),
        (SELECT id FROM "user" WHERE first_name = 'Jozef'),
        (SELECT id FROM role WHERE name = 'ROLE_ONSITE'));

INSERT INTO "user"(first_name, last_name, email, password)
VALUES ('checkinbot', 'checkinbot', 'checkinbot@email.com', 'bro is a bot');

INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM "user" WHERE first_name = 'checkinbot'),
        (SELECT id FROM role WHERE name = 'ROLE_ONSITE'));
INSERT INTO organization_user(organization_id, user_id, role_id)
VALUES ((SELECT id FROM organization WHERE name = 'FOSS MEC'),
        (SELECT id FROM "user" WHERE first_name = 'checkinbot'),
        (SELECT id FROM role WHERE name = 'ROLE_ONSITE'));

INSERT INTO event(organization_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'), 'Technohack');
INSERT INTO event(organization_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'), 'Technoprenuer Day 1');
INSERT INTO event(organization_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'), 'Technoprenuer Day 2');

INSERT INTO event(organization_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'FOSS MEC'), 'DebUtsav');

INSERT INTO extra(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technohack'), 'Tea');
INSERT INTO extra(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technohack'), 'Dinner');
INSERT INTO extra(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technohack'), 'Breakfast');
INSERT INTO extra(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technohack'), 'Lunch');

INSERT INTO extra(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Workshop 1');
INSERT INTO extra(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Workshop 2');
INSERT INTO extra(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Workshop 3');
INSERT INTO extra(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Workshop 4');
INSERT INTO extra(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Veg Lunch');
INSERT INTO extra(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Non Veg Lunch');
INSERT INTO extra(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Workshop 5');
INSERT INTO extra(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Workshop 6');
INSERT INTO extra(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Workshop 7');
INSERT INTO extra(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 1'), 'Workshop 8');

INSERT INTO extra(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 2'), 'Veg Lunch');
INSERT INTO extra(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 2'), 'Non Veg Lunch');
INSERT INTO extra(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 2'), 'Tea');
INSERT INTO extra(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'IEDC MEC'),
        (SELECT id FROM event WHERE name = 'Technoprenuer Day 2'), 'Iftaar Box');

INSERT INTO attribute(organization_id, event_id, name)
VALUES ((SELECT id FROM organization WHERE name = 'FOSS MEC'),
        (SELECT id FROM event WHERE name = 'DebUtsav'), 'T-Shirt Size');

INSERT INTO participant(organization_id, event_id, first_name, last_name)
VALUES ((SELECT id FROM organization WHERE name = 'FOSS MEC'), (SELECT id FROM event WHERE name = 'DebUtsav'),
        'James', 'Bond');