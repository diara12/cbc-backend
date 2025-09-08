import Review from "../models/review.js";

// Create a new review (no authentication required)
export async function createReview(req, res) {
    const { productId } = req.params;
    const { name, rating, comment } = req.body;

    if (!name || !rating || !comment) {
        return res.status(400).json({ message: "Name, rating, and comment are required" });
    }

    try {
        const review = new Review({
            productId,
            name,
            rating,
            comment
        });

        await review.save();
        res.json(review); // return the created review
    } catch (error) {
        res.status(500).json({ message: "Failed to create review", error });
    }
}

// Get all reviews for a specific product
export async function getReviewsByProduct(req, res) {
    const { productId } = req.params;

    try {
        const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reviews", error });
    }
}

export async function getAllReviews(req, res) {
    try {
        // Exclude the 'name' field from the results
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch all reviews" });
    }
}