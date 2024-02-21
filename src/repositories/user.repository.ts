import mongoose from "mongoose";
import userModel from "../database/models/user.model";
import { IUserInterface } from "../database/interface/user.interface";

//getting user data
export const getUserRepo = async (
  userId: string
): Promise<IUserInterface | null> => {
  try {
    const user = await userModel.findOne({ uid: userId });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//deleting user data
export const deleteUserRepo = async (userId: string): Promise<boolean> => {
  try {
    const deleted = await userModel.findByIdAndDelete({ uid: userId });
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

//create the user
export const createUserRepo = async (
  user: IUserInterface
): Promise<boolean> => {
  try {
    await userModel.create(user);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//update user
export const updateUserRepo = async (
  userId: String,
  updatedUser: IUserInterface
): Promise<boolean> => {
  try {
    const result = await userModel.findOneAndUpdate(
      { uid: userId },
      updatedUser,
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

export const updateUserWithTweetIdRepo = async (
  userId: string,
  tweetId: string
): Promise<boolean> => {
  try {
    const result = await userModel.findOneAndUpdate(
      { uid: userId },
      { $push: { tweets: tweetId } }
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
