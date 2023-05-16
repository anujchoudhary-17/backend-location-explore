const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const DUMMY_USERS = [
  {
    id: "p1",
    name: "Anuj Choudhary",
    email: "temp@temp.com",

    password: "temptemp",
  },
];

const getAllUsers = async (req, res, next) => {
  let allUsers;
  try {
    allUsers = await User.find({}, "-password");
  } catch (err) {
    return next(
      new HttpError("Singing up failed, please try again later", 500)
    );
  }
  res.json({ users: allUsers.map((user) => user.toObject({ getters: true })) }); // => { DUMMY_USERS } => { DUMMY_USERS: DUMMY_USERS }
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    throw new HttpError("Singing up failed, please try again later", 500);
  }

  if (existingUser) {
    const error = new HttpError("User exists already, please login instead.");
    return next(error);
  }
  const createdUser = new User({
    name,
    email,
    image:
      "https://s3-media0.fl.yelpcdn.com/bphoto/5L44X1Ma90dEKzdpWWv1gg/l.jpg",
    password,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (e) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;

  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    throw new HttpError("Sign In failed, please try again later", 500);
  }

  if (user.password === password) {
    res.json({ user: user.toObject({ getters: true }) });
  } else {
    return next(new HttpError("Incorrect Password!!!", 401));
  }
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
