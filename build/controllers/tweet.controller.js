"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTweetController = exports.updateTweetController = exports.createTweetController = exports.getTweetController = void 0;
const tweet_repository_1 = require("../repositories/tweet.repository");
const getTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const TweetId = req.query.TweetId;
    try {
        const Tweet = yield (0, tweet_repository_1.getTweetRepo)(TweetId);
        if (Tweet) {
            res.status(200).json({ data: Tweet });
        }
        else {
            res.status(500).json({ error: "Tweet not found" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.getTweetController = getTweetController;
const createTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Tweet = req.body;
    try {
        const success = yield (0, tweet_repository_1.createTweetRepo)(Tweet);
        if (success) {
            res.status(200).json({ data: Tweet });
        }
        else {
            res.status(500).json({ error: "cannot create Tweet" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.createTweetController = createTweetController;
const updateTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTweet = req.body;
    try {
        const success = yield (0, tweet_repository_1.updateTweetRepo)(updatedTweet.tweetId, updatedTweet);
        if (success) {
            res.status(200).json({ data: "Tweet updated" });
        }
        else {
            res.status(500).json({ error: "cannot update Tweet" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.updateTweetController = updateTweetController;
const deleteTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const TweetId = req.query.TweetId;
    try {
        const deleted = yield (0, tweet_repository_1.deleteTweetRepo)(TweetId);
        if (deleted) {
            res.status(200).json({ data: "Tweet deleted" });
        }
        else {
            res.status(500).json({ error: "Cannot delete Tweet" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.deleteTweetController = deleteTweetController;
