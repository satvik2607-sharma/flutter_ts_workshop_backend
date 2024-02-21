import { Document } from "mongoose";

export interface IUserInterface extends Document {
  uid: String;
  tweets: String[];
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}
