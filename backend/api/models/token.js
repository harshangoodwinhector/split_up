// Import the mongoose library
import mongoose from 'mongoose';
const { Schema } = mongoose;

// Create a new mongoose schema for the "token" collection
const tokenSchema = new mongoose.Schema({
	userId: {
		type: Schema.Types.ObjectId, // User ID associated with the token
		required: true, // This field is required
		ref: "flat", // Reference to the "flat" collection
		unique: true, // this field should be unique
	},
	token: { type: String, required: true }, // Token String
	createdAt: { type: Date, default: Date.now, expires: 3600 }, //Token expiration date (1 hour after creation)
},{versionKey:false});

//Export a mongoose model for token collection
export const Token = mongoose.model('token', tokenSchema);

//Export an object with the token model as its property
export default {Token};