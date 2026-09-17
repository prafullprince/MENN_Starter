import { Schema, model, Document, Types } from "mongoose";

export interface IOtp extends Document {
  _id: Types.ObjectId;
  email: string;
  otp: string;
  createdAt: Date;
  updatedAt: Date;
}

const otpSchema = new Schema<IOtp>(
  {
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
      required: true
    },
    otp: {
        type: String,
        trim: true,
        required: true,
        expires: 10*60
    },
  },
  { timestamps: true },
);

export const OTP = model<IOtp>("OTP", otpSchema);
