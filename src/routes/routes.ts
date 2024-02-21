import { Router } from "express";
import helloRouter from "./hello.route";
import userRouter from "./user.route";
import tweetRouter from "./tweet.route";

const router = Router();

router.use("/user", userRouter);
router.use("/tweet", tweetRouter);
router.use("/hello", helloRouter);

export default router;
