import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    productId: {
        type: String, // product ID from frontend
        required: true
    },
    name: {
        type: String, // reviewer's name
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model("review", reviewSchema);

export default Review;
