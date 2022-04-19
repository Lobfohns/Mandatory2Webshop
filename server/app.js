import express from "express";
import cors from "cors";
//import nodemailer from "nodemailer";
import ipasRouter from "./routers/ipasRouter.js"
import nonipasRouter from "./routers/ipasRouter.js"
import usersRouter from "./routers/usersRouter.js"
import path from "path";
import helmet from "helmet";
import rateLimit from 'express-rate-limit'
import session from "express-session";
import dotenv from "dotenv"

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

const baseLimiter = rateLimit({
    //the line below limits the window auth times, after 15 minutes the limit will be reset
	windowMs: 15 * 60 * 1000, // 15 minutes
    //The client is allowed to access 5 times
	max: 100, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const authLimiter = rateLimit({
    //the line below limits the window auth times, after 15 minutes the limit will be reset
	windowMs: 15 * 60 * 1000, // 15 minutes
    //The client is allowed to access 5 times
	max: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// If I put app.use(session) beneath the other app.uses it wont work lol. Took me something like an hour to fix this jesus :D.
app.use(session({
    secret: 'keyboard cat should not be pushed',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(express.json());
app.use(cors());
//app.use(nodemailer());
app.use(express.static(path.resolve("../client/public")));
app.use(ipasRouter, nonipasRouter, usersRouter);
app.use(helmet());
app.use(baseLimiter);
app.use("/auth", authLimiter);









app.listen(PORT, () => {
    console.log("Server is running on", PORT);
});