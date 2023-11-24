const jwt = require("jsonwebtoken");

const jwtMiddelware = (req, res, next) => {
  console.log("Inside JWT Middleware");
  const token = req.headers["authorization"].split(" ")[1];
  console.log(token);
  try {
    const jwtResponse = jwt.verify(token, "supersecretkey");
    console.log(jwtResponse);
    req.payload = jwtResponse.userId;
    next();
  } catch (err) {
    res.status(401).json("Authorization failed!!! Please try again later");
  }
};

module.exports = jwtMiddelware;
