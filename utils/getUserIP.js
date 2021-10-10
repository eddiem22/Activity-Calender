module.exports = (req, res) => {
  // Initialize variable to store User's IP
  let userIP;

  // Try to get User's IP address
  try {
      userIP = req.header('x-forwarded-for') || req.socket.remoteAddress;
  } catch (err) {
      return res.status(400).json({success: false, msg: "Couldn't get user ip address"})
  }

  return userIP;
}