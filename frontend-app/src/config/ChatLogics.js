const getSender = (loggedUser, users) => {
  const user = users.find((u) => u._id !== loggedUser._id);
  return user;
};

module.exports = getSender;
