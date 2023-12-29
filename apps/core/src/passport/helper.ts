const { pg } = require('pgdatabase');
const bcrypt = require('bcryptjs');
const { User } = require('common');
const jwt = require('jsonwebtoken');

var config = {
  secretKey: process.env.SECRET_KEY,
};

function validateEmail(email: string) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}

const createUser = async (email: string, password: string, firstName: string, lastName: string) => {
  if (!validateEmail(email)) throw new Error('Invalid email');

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const data = await pg.query(
    `INSERT INTO "user" (email, password, first_name, last_name)
     SELECT $1::varchar, $2, $3, $4
     WHERE NOT EXISTS (
       SELECT email FROM "user" WHERE email = $1::varchar
     )
     RETURNING id, email, password, first_name, last_name`,
    [email, hash, firstName, lastName],
  );
  if (data.rowCount == 0) throw new Error('User already exists');
  return data.rows[0];
};

const matchPassword = async (password: string, hashPassword: string) => {
  const match = await bcrypt.compare(password, hashPassword);
  return match;
};

const emailExists = async (email: string) => {
  const data = await pg.query('SELECT * FROM "user" WHERE email=$1', [email]);

  if (data.rowCount == 0) return false;
  let user: typeof User = data.rows[0];
  let orgs = (
    await pg.query(
      `SELECT organization_id, name, role_id FROM organization_user JOIN organization ON
   organization_user.organization_id = organization.id WHERE organization_user.user_id = $1`,
      [user.id],
    )
  ).rows;
  const token = jwt.sign(user, config.secretKey, { expiresIn: 25200 });
  user = { ...user, organisations: orgs, token };
  return user;
};

exports.getToken = function (user: typeof User) {
  return jwt.sign(user, config.secretKey, { expiresIn: 25200 });
};

export { createUser, matchPassword, emailExists };
