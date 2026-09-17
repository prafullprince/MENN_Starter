
import { Router } from "express";
import { loginRateLimiter, otpRateLimiter, registerRateLimiter } from "../../middleware/rate_limiter.middleware.js";
import { loginSchema, registerSchema, verifyEmailSchema } from "./auth.validation.js";
import { errorHandler } from "../../middleware/error_handler.middleware.js";
import { validateRequest } from "../../middleware/validate_request.middleware.js";
import { login, logout, refresh, register, sendOtp } from "./auth.controller.js";

const router = Router();

router.post(
  "/send_otp",
  otpRateLimiter,
  validateRequest(verifyEmailSchema),
  sendOtp,
  errorHandler,
);
router.post(
  "/register",
  registerRateLimiter,
  validateRequest(registerSchema),
  register,
  errorHandler,
);
router.post(
  "/login",
  loginRateLimiter,
  validateRequest(loginSchema),
  login,
  errorHandler,
);
router.post("/refresh", refresh, errorHandler);
router.post("/logout", logout, errorHandler);

export default router;
