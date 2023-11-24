const users = require("../Models/userSchema");
// import jsonwebtoken for authorisation purpose
const jwt = require("jsonwebtoken");

// register
exports.register = async (req, res) => {
  console.log("Inside register controller function");
  const { username, email, password } = req.body;
  // console.log(`${username}, ${email}, ${password}`);

  // asynchronous function , so using async await
  // checking the user exists in users the db
  try {
    // {email} bcos {email:email}
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      res.status(406).json("Account already exists! Please login...");
    } else {
      // make an object of users model in userSchema
      const newUser = new users({
        username,
        email,
        password,
        github: "",
        linkedin: "",
        profile: "",
      });
      // saving details to mongodb
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(`Register API failed, Error: ${err}`);
  }

  res.status(200).json("Register request recieved");
};

// login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await users.findOne({ email, password });
  // console.log(existingUser);

  try {
    if (existingUser) {
      // generating token for authorisation
      const token = jwt.sign(
        { userId: existingUser._id },
        "supersecretkey"
      );
      res.status(200).json({
        existingUser,
        token,
      });
    } else {
      res.status(404).json("Incorrect email or password");
    }
  } catch {
    res.status(401).json(`Login API failed, Error: ${err}`);
  }
};
