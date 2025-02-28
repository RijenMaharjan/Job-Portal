import userModels from "../models/userModels.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await userModels.create({ name, email, password });
  res.status(201).send({
    success: true,
    message: "User created successfully",
    user,
  });
};
