const pg = require('pgdatabase').pg;
const bcrypt = require('bcryptjs');

const createUser = async (email: String, password: String) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const data = await pg.query(
    `INSERT INTO users(email, password) VALUES ($1, $2) RETURNING id, email, password  WHERE
      NOT EXISTS( SELECT 1
          FROM users 
          WHERE email = $1)
      `,
    [email, hash],
  );

  if (data.rowCount == 0) return false;
  return data.rows[0];
};

export { createUser };