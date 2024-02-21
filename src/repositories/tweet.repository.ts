import mongoose from "mongoose";
import userModel from "../database/models/user.model";
import { IUserInterface } from "../database/interface/user.interface";
import { ITweetInterface } from "../database/interface/tweet.interface";
import tweetModel from "../database/models/tweet.model";

//getting tweet data
export const getTweetRepo = async (
  tweetId: string
): Promise<ITweetInterface | null> => {
  try {
    const tweet = await tweetModel.findOne({ tweetId: tweetId });
    return tweet;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//deleting tweet data
export const deleteTweetRepo = async (tweetId: string): Promise<boolean> => {
  try {
    const deleted = await tweetModel.findByIdAndDelete({ uid: tweetId });
    if (deleted) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

//create the tweet
export const createTweetRepo = async (
  tweet: ITweetInterface
): Promise<boolean> => {
  try {
    await tweetModel.create(tweet);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//update tweet
export const updateTweetRepo = async (
  tweetId: string,
  updatedTweet: ITweetInterface
): Promise<boolean> => {
  try {
    const result = await tweetModel.findOneAndUpdate(
      { uid: tweetId },
      updatedTweet,
      { new: true }
    );
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
