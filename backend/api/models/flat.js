// Importing necessary packages
import mongoose from "mongoose";   // Mongoose package for MongoDB object modeling
import jwt from "jsonwebtoken";   // JSON Web Token package
import Joi from "joi";            // Joi package for data validation
import passwordComplexity from "joi-password-complexity";  // Joi package for password complexity validation
import User from "./User.js";     // Importing User model
import { Schema} from "mongoose"; // Importing Schema object from Mongoose

// Defining the flat schema using Mongoose Schema
const flatSchema = new mongoose.Schema({
    flatName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    User:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }],
    verified: {
        type: Boolean,
        default: false
    },
}, {
    versionKey: false // Removing versionKey from the schema
});

// Creating a method to generate JSON Web Token for authentication
flatSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, "azbycx192836", {
		expiresIn: "7d",
	});
	return token;
};

// Defining a validation schema for registration data using Joi
export const validate = (data) => {
	const schema = Joi.object({
		flatName: Joi.string().required().label("Flat Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

// Defining a validation schema for login data using Joi
export const login_validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

// Creating a Mongoose model for the Flat schema
export const Flat = mongoose.model("flat", flatSchema);

// Exporting the Flat model
export default {Flat};
