const { AUTHENTICATION_ERROR } = require('../../errors/appErrors');

const usersRepo = require('./user.db.repository');
const User = require('./user.model');

const authenticate = async user => {
  const userEntity = await usersRepo.getUserByEmail(user.email);

  const isValidated = await User.validatePass(
    user.password,
    userEntity.password
  );

  if (!isValidated) {
    throw new AUTHENTICATION_ERROR();
  }

  return { id: userEntity._id };
};

const get = id => usersRepo.get(id);

const save = user => usersRepo.save(user);

const update = (id, user) => usersRepo.update(id, user);

module.exports = { authenticate, get, save, update };
