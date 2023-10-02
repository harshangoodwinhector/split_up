// Import required modules
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

// Destructure Schema object from mongoose
const { Schema } = mongoose;

// Define user schema
const userSchema = new mongoose.Schema({
	// First name field with required validation
	firstName: {
		type: String,
		required: true
	},
	// Last name field with required validation
	lastName: {
		type: String,
		required: true
	},
	// Flat ID field with required validation and reference to 'flat' model
	flatId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "flat"
	},
	// Email field with required validation and email format validation
	email: {
		type: String,
		required: true
	},
	// Password field with required validation
	password: {
		type: String,
		required: true
	},
	// Target saving field with default value of 0
	target_saving: {
		type: Number,
		default: 0
	},
	// Monthly budget field with default value of 0
	monthly_budget: {
		type: Number,
		default: 0
	},
	// Verified field with default value of false
	verified: {
		type: Boolean,
		default: false
	},
}, {
	// Disable version key in document
	versionKey: false
});

// Define method to generate JWT token for user
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({
		_id: this._id
	}, "azbycx192837", {
		expiresIn: "7d",
	});
	return token;
};

// Export User model
export const User = mongoose.model("user", userSchema);

// Define validation schema for user registration
export const validate = (data) => {
	const schema = Joi.object({
		// First name field with required validation
		firstName: Joi.string().required().label("First Name"),
		// Last name field with required validation
		lastName: Joi.string().required().label("Last Name"),
		// Email field with required validation and email format validation
		email: Joi.string().email().required().label("Email"), 
		// Password field with required validation and complexity validation using joi-password-complexity
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

// Define validation schema for user login
export const login_validate = (data) => {
	const schema = Joi.object({
		// First name field with required validation (for login)
		firstName: Joi.string().required().label("First Name"),
		// Password field with required validation and complexity validation using joi-password-complexity (for login)
		password: passwordComplexity().required().label("Password")
	});
	return schema.validate(data);
};

// Export object containing User model
export default {
	User
};
