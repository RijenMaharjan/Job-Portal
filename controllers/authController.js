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
