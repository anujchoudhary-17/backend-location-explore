const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const DUMMY_USERS = [
  {
    id: "p1",
    name: "Anuj Choudhary",
    email: "temp@temp.com",

    password: "temptemp",
  },
];

const getAllUsers = (req, res, next) => {
  if (!DUMMY_USERS) {
    throw new HttpError("Could not find registered users", 404);
  }
  res.json({ DUMMY_USERS }); // => { DUMMY_USERS } => { DUMMY_USERS: DUMMY_USERS }
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { name, email, password } = req.body;

  const createdUser = { id: uuidv4(), name, email, password };
  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const user = DUMMY_USERS.find((p) => {
    return p.email === email;
  });

  if (!user) {
    return next(
      new HttpError("Couldn't find user, credentials seem to be wrong!", 401)
    );
  }

  if (user.password === password) {
    res.json({ user });
  } else {
    return next(new HttpError("Incorrect Password!!!", 401));
  }
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
