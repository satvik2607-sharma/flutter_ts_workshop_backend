import { Request, Response } from "express";
import {
  getTweetRepo,
  createTweetRepo,
  updateTweetRepo,
  deleteTweetRepo,
} from "../repositories/tweet.repository";
import { updateUserWithTweetIdRepo } from "../repositories/user.repository";
import { ITweetInterface } from "../database/interface/tweet.interface";
import { isConstructorDeclaration } from "typescript";

export const getTweetController = async (req: Request, res: Response) => {
  const TweetId = req.query.TweetId as string;

  try {
    const Tweet = await getTweetRepo(TweetId);
    if (Tweet) {
      res.status(200).json({ data: Tweet });
    } else {
      res.status(500).json({ error: "Tweet not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const createTweetController = async (req: Request, res: Response) => {
  const Tweet: ITweetInterface = req.body;

  try {
    const success = await createTweetRepo(Tweet);
    if (success) {
      const userUpdateSuccess = await updateUserWithTweetIdRepo(
        Tweet.adminId,
        Tweet.tweetId
      );
      if (userUpdateSuccess) {
        res.status(200).json({ data: Tweet });
      } else {
        res.status(500).json({ error: "user not updated" });
      }
    } else {
      res.status(500).json({ error: "cannot create Tweet" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const updateTweetController = async (req: Request, res: Response) => {
  const updatedTweet: ITweetInterface = req.body;

  try {
    const success = await updateTweetRepo(updatedTweet.tweetId, updatedTweet);
    if (success) {
      res.status(200).json({ data: "Tweet updated" });
    } else {
      res.status(500).json({ error: "cannot update Tweet" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
export const deleteTweetController = async (req: Request, res: Response) => {
  const TweetId = req.query.TweetId as string;
  try {
    const deleted = await deleteTweetRepo(TweetId);
    if (deleted) {
      res.status(200).json({ data: "Tweet deleted" });
    } else {
      res.status(500).json({ error: "Cannot delete Tweet" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
