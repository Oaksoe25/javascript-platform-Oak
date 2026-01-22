import {
  registerService,
  loginService
} from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const user = await registerService(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const token = await loginService(req.body);

    res.json({
      message: "Login successful",
      token
    });
  } catch (error) {
    next(error);
  }
};
