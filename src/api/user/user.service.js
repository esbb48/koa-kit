const generateId = require('../../utils/generateId.util');
/**
 * Mock database, replace this with your db models import, required to perform query to your database.
 */
const db = {
  users: [
    {
      id: 'bff28903-042e-47c2-b9ee-07c3954989ec',
      name: 'Marco',
      created_at: 1558536830937,
    },
    {
      id: 'dca01a32-36e6-4886-af75-8e7caa0162a9',
      name: 'Leonardo',
      created_at: 1558536843742,
    },
    {
      id: 'dca01a32-36e6-4886-af75-8e7caa0162a9',
      name: 'Berta',
      created_at: 1558536863550,
    },
  ],
};

exports.getOne = async ({ userId }) => {
  const user = db.users.find(user => user.id === userId);
  return user;
};

exports.getAll = async ({ userId }) => {
  return {
    users: db.users,
    total: 99,
    page: 1,
  };
};

exports.createOne = async ({ name }) => {
  const id = generateId();
  const newUser = {
    id,
    name,
    timestamp: Date.now(),
  };
  db.users.push(newUser);
  const createdUser = db.users.find(user => user.id === id);
  return createdUser;
};

exports.updateOne = async ({ userId, name }) => {
  const updateedUser = db.users.find(user => user.id === userId);
  updateedUser.name = name;
  return updateedUser;
};
