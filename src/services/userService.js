const bcrypt = require("bcryptjs");
const seedUsers = require("../data/users");

const users = [...seedUsers];
let nextId = Math.max(...users.map((user) => user.id), 0) + 1;

async function createUser({ name, email, password }) {
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    id: nextId++,
    name,
    email,
    password: hashedPassword,
  };

  users.push(user);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

async function findByEmail(email) {
  return users.find((user) => user.email === email) || null;
}

module.exports = {
  createUser,
  findByEmail,
};
