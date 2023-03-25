const { User } = require("../../models");
const { Conflict } = require("http-errors");

const editInfo = async (req, res) => {
  const user = req.user;
  const body = req.body;

  const key = Object.keys(body);

  if (key[0] === "email") {
    const user = await User.findOne({ email: body.email });
    if (user) {
      throw new Conflict(`Email in use`);
    }
  }
  if (key[0] === "phone") {
    const user = await User.findOne({ phone: body.phone });
    if (user) {
      throw new Conflict(`Phone in use`);
    }
  }

  await User.findByIdAndUpdate({ _id: user.id }, body, {
    new: true,
  });

  res.json(body);
};

module.exports = editInfo;
