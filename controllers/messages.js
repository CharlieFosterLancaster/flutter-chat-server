const Message = require("../models/message");

const getChat = async (req, res) => {
  const from = req.uid;
  const to = req.params.to;

  const last30 = await Message.find({
    $or: [
      { from: from, to: to },
      { from: to, to: from },
    ],
  })
    .sort({ createdAt: "desc" })
    .limit(30);

  res.json({
    ok: true,

    messages: last30,
  });
};

module.exports = {
  getChat,
};
