import "dotenv/config";
import path from "path";
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import usersRouter from "./routes/users";
import adminHotelsRouter from "./routes/adminHotels";
import hotelsRouter from "./routes/hotels";
import verifyRouter from "./routes/verify";
import errMiddleware from "./middleware/general/errMiddleware";
import { connectCloudinary } from "./config/cloudinary";
// import bookingsRouter from "./routes/bookings";
// import { webhook } from "./controllers/bookingControllers";
import bookingsRouter from "./routes/bookingsCustom";
import { webhook } from "./controllers/bookingCustomControllers";

const port = +process.env.PORT! || 3000;

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? process.env.FRONT_URL_DEV
        : process.env.FRONT_URL,
    credentials: true,
  })
);

app.set("trust proxy", 1);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.post(
  "/api/v1/bookings/webhook",
  express.raw({ type: "application/json" }),
  webhook
);

app.use(express.json());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/verify", verifyRouter);
app.use("/api/v1/admin-hotels", adminHotelsRouter);
app.use("/api/v1/hotels", hotelsRouter);
// app.use("/api/v1/bookings", bookingsRouter);
app.use("/api/v1/bookings", bookingsRouter);

app.use(express.static(path.join(__dirname, "../../client/dist")));

if (process.env.NODE_ENV !== "development") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
  });
}

app.use(errMiddleware);

const start = async () => {
  try {
    await connectCloudinary();
    await connectDB();
    app.listen(port, "0.0.0.0", () =>
      console.log(`=> server listening on ${port}...`)
    );
  } catch (err: any) {
    console.dir(err.message);
  }
};

start();

/*
netstat -ano | findstr :3000
npx kill-port 3000
*/
