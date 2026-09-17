import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  phoneNumber?: string;
  email: string;
  password: string;
  profile_pic?: string;
  about: string;
  lastSeen: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    phoneNumber: { type: String },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true
    },
    password: { type: String, required: true },
    profile_pic: { type: String, default: "" },
    about: { type: String, default: "Hey there! I am using WhatsApp Clone." },
    lastSeen: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const User = model<IUser>("User", UserSchema);
