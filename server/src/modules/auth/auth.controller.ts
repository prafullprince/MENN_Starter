import type { NextFunction, Request, Response } from "express";
import type {
  LoginDto,
  RegisterDto,
  VerifyEmailDto,
} from "./auth.validation.js";
import { OTP, Session, User } from "../../models/index.js";
import { ApiError } from "../../utils/apiError.utils.js";
import otpGenerator from "otp-generator";
import { sendEmail } from "../../utils/email.utils.js";
import bcrypt from "bcryptjs";
import {
  createAccessToken,
  createRefreshToken,
  hashToken,
} from "../../utils/tokens.js";

// send_otp
export const sendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // fetch data
    const input: VerifyEmailDto = req.body;

    // isUser Exists
    const isUser = await User.findOne({ email: input.email });
    if (isUser) {
      throw new ApiError(400, "User already Exists, Please Login to Continue");
    }

    // create otp
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });

    // save in db
    await OTP.create({
      otp,
      email: input.email,
    });

    // send otp on email
    await sendEmail(input.email, "Otp verification mail", otp);

    // return res
    return res.status(201).json({
      success: true,
      message: "Otp sent successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // fetch data
    const input: RegisterDto = req.body;

    // isUser Exists
    const isUser = await User.findOne({ email: input.email });
    if (isUser) {
      throw new ApiError(
        400,
        "User already registerd, please login to continue",
      );
    }

    // otp verification
    const otpDoc = await OTP.findOne({ email: input.email }).sort({
      createdAt: -1,
    });
    if (!otpDoc) {
      throw new ApiError(400, "Otp not found");
    }
    if (otpDoc.otp !== input.otp) {
      throw new ApiError(400, "Invalid Otp");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(input.password, 10);
    console.log("password: ", hashedPassword);

    // default profile_pic
    const profile_pic = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(input.name)}`;

    // save user in db
    await User.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      profile_pic,
    });

    // return res
    return res.status(201).json({
      success: true,
      message: "Successfully Registered",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // fetch data
    const input: LoginDto = req.body;

    // isUser exists
    const isUser = await User.findOne({ email: input.email });
    if (!isUser) {
      throw new ApiError(404, "User not found, Please signup first");
    }
    console.log("isUser: ", isUser);
    // password validation
    if (!(await bcrypt.compare(input.password, isUser.password))) {
      throw new ApiError(400, "Incorrect Password");
    }

    // create access_token & refresh_token
    const access_token = await createAccessToken(
      isUser._id,
      isUser.name,
      isUser.email,
    );
    const refresh_token = await createRefreshToken(
      isUser._id,
      isUser.name,
      isUser.email,
    );

    // hash refresh_token
    const hashed_refresh_token = hashToken(refresh_token);

    // save in db
    await Session.create({
      userId: isUser._id,
      name: isUser.name,
      email: isUser.email,
      tokenHash: hashed_refresh_token,
    });

    // send refresh_token in cookies
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // return res
    return res.status(200).json({
      success: true,
      messsage: "LoggedIn",
      access_token: access_token,
      user: {
        user_id: isUser._id,
        user_name: isUser.name,
        user_email: isUser.email,
        user_dp: isUser.profile_pic,
        user_about: isUser.about,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// refresh
export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // fetch refresh_token
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      throw new ApiError(400, "Refresh Token Not Found");
    }

    const hashed_Refresh_token = hashToken(refresh_token);

    // fetch session
    const session = await Session.findOne({ tokenHash: hashed_Refresh_token });
    if (!session) {
      throw new ApiError(400, "Session not found");
    }

    // isUser
    const isUser = await User.findById(session.userId);
    if (!isUser) {
      throw new ApiError(400, "User not Found");
    }

    // delete old session
    await Session.deleteOne({ tokenHash: hashed_Refresh_token });

    // create new_access_token
    const new_access_token = await createAccessToken(
      isUser._id,
      isUser.name,
      isUser.email,
    );
    const new_refresh_token = await createRefreshToken(
      isUser._id,
      isUser.name,
      isUser.email,
    );

    const hash_new_ref_token = hashToken(new_refresh_token);

    // create new session
    await Session.create({
      userId: isUser._id,
      name: isUser.name,
      email: isUser.email,
      tokenHash: hash_new_ref_token,
    });

    // send refresh_token in cookies
    res.cookie("refresh_token", new_refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // return res
    return res.status(200).json({
      success: true,
      messsage: "Refresh successfully",
      access_token: new_access_token,
      user: {
        user_id: isUser._id,
        user_name: isUser.name,
        user_email: isUser.email,
        user_dp: isUser.profile_pic,
        user_about: isUser.about,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// logout
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    if (refresh_token) {
      const hashedRefreshToken = hashToken(refresh_token);
      await Session.deleteOne({ tokenHash: hashedRefreshToken });
    }

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
