import userModels from "../models/userModels.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await userModels.create({ name, email, password });
  //token
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "User created successfully",
    user: {
      name: user.name,
      lastname: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next("Please fill all fields.");
  }
  //find user by email
  const user = await userModels.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid Username or Password");
  }

  //compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid Username or Password");
  }
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login successful",
    user,
    token,
  });
};
