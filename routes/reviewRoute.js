import express from "express";
import { createReview, getReviewsByProduct, getAllReviews  } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

// Get all reviews (admin)
reviewRouter.get("/", getAllReviews);

// Create a new review for a product
reviewRouter.post("/:productId", createReview);

// Get all reviews for a product
reviewRouter.get("/:productId", getReviewsByProduct);

export default reviewRouter;
