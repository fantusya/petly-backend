const getCurrent = async (req, res) => {
  const { email } = req.user;
  res.status(200).json({
    user: {
      email,
    },
  });
};

module.exports = getCurrent;
