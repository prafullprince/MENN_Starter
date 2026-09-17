import express, { type Request, type Response } from "express";
import "dotenv/config";
import cors from "cors";

import appRoutes from "./routes/index.js";
import { connectDB } from "./config/mongodb.js";
import cookieParser from "cookie-parser";

// initialize app
const app = express();
const PORT = process.env.PORT || 10000;

// middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// default routes
app.get("/health", (req: Request, res: Response) => {
  return res.json({
    success: true,
    message: "ok",
  });
});

// routes
app.use("/api/v1", appRoutes);

// start server
async function main() {
  // connect db
  await connectDB();

  // start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
main();
