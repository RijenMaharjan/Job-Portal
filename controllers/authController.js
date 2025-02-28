import userModels from "../models/userModels.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    //validate
    if (!name) {
      next("Name is required");
    }
    if (!email) {
      next("please provide email");
    }
    if (!password) {
      next("please provide password and atleast 6 characters");
    }
    const existingUser = await userModels.findOne({ email });
    if (existingUser) {
      next("Email already registered. Please login");
    }
    const user = await userModels.create({ name, email, password });
    res.status(201).send({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
