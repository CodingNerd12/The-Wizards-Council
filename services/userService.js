const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Wizard } = require("./models/Wizard");
require("dotenv").config();

const { ACCESS_TOKEN_SECRET } = process.env;

async function registerUser(req, res, next) {
  try {
    let { student_name, isStudent, isSuperUser, hogwartsHouse, password } =
      req.body;

    // create the salt
    let salt = await bcrypt.genSalt(5);

    // use bcrypt to hash the password
    const hashedPw = await bcrypt.hash(password, salt);

    // add user to db
    let createdUser = await Wizard.create({
      student_name,
      isStudent,
      isSuperUser,
      hogwartsHouse,
      password: hashedPw,
    });
    console.log(createdUser);

    // Create a token, To sign we must include: 1. The object  2. The secret
    const token = jwt.sign(
      { id: createdUser.id, student_name: createdUser.student_name },
      ACCESS_TOKEN_SECRET
    );

    res.send({
      messge: `New wizard ${student_name} Successfully Registered`,
      token,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

// Add other user-related functions here

module.exports = {
  registerUser,
  // Export other user-related functions here
};
