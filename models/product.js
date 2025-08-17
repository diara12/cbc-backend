import mongoose from "mongoose";

const productSchema = mongoose.Schema({
	productId : {
		type : String,
		required : true,
		unique : true
	},
	name : {
		type : String,
		required : true
	},
	altNames : [
		{type : String}
	],
	description : {
		type : String,
		required : true
	},
	images : [
		{type : String}
	],
	labelledPrice : {
		type : Number,
		required : true
	},
	price : {
		type : Number,
		required : true
	},
	stock : {
		type : Number,
		required : true
	},
	isAvailable : {
		type : Boolean,
		required : true,
		default : true
	},
	category: {
		type: String,
		required: true,
		enum: ["Lip Care", "Eye Makeup", "Face makeup", "Skin Care"]
	}
});

const Product = mongoose.model("products", productSchema);

export default Product;