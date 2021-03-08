const response = require("express");
const User = require("../models/user");

const getUsers = async (req, res = response) => {
  const count = Number(req.query.count) || 0;
  const users = await User.find({
    _id: { $ne: req.uid },
  })
    .sort("-online")
    .skip(count)
    .limit(20);

  return res.status(400).json({
    ok: true,
    users,
  });
};

module.exports = {
  getUsers,
};
