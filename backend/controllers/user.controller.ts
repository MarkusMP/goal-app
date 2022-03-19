import { Request, Response } from "express";
import { findUserByEmail, createUser } from "../services/user.service";
import generateToken from "../utils/generateToken";
import bcrypt from "bcryptjs";
import { IGetUserAuthInfoRequest } from "utils/definitionFile";

// @route   POST api/user
// @desc    Register new user
// @access  Public
const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    res.json({ message: "Please enter all fields" });
    return;
  }

  const userExists = await findUserByEmail(email);

  if (userExists) {
    res.status(400);
    res.json({ message: "User already exists" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await createUser(name, email, hashedPassword);

  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
      created_at: user.created_at,
    });
  } else {
    res.status(400);
    res.json({ message: "User could not be created" });
    return;
  }
};

// @route   POST api/user/login
// @desc    Login user
// @access  Public
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    res.json({ message: "Please enter all fields" });
    return;
  }

  const user = await findUserByEmail(email);

  if (!user) {
    res.status(401);
    res.json({ message: "Invalid credentials" });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401);
    res.json({ message: "Invalid credentials" });
    return;
  }

  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
    created_at: user.created_at,
  });
};

// @route   GET api/user
// @desc    Get my user data
// @access  Private
const getUser = async (req: IGetUserAuthInfoRequest, res: Response) => {
  res.status(200).json(req.user);
};

export { register, login, getUser };
