export const adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    res.json({ success: true, message: "Admin Login Success" });
  } else {
    res.status(401).json({ success: false, message: "Invalid Credentials" });
  }
};