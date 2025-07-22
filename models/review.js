import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    email: {
		type: String,
		required: true,
        unique : true
	},
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    comment : {
        type : String,
        required : true
    }

})

const Review = mongoose.model("reviews", reviewSchema);

export default Review;