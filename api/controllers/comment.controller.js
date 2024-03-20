import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, userId, postId } = req.body;

    if (userId !== req.user.id) {
      return next(errorHandler(403, "You are not allowed to comment"));
    }

    const newComment = new Comment({ content, userId, postId });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};
