import mongoose, { Schema, Document } from "mongoose";
import { string } from "zod";

export interface ISession extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    name: string,
    email: string;
    tokenHash: string;
    expireAt: Date;
}

const sessionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: string,
        required: true
    },
    email: {
        type: string,
        required: true
    },
    tokenHash: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date
    }
});

sessionSchema.index({ "createdAt": 1 }, { expireAfterSeconds: 604800 })
export const Session = mongoose.model<ISession>("Session", sessionSchema);
