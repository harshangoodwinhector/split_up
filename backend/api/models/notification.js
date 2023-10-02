// Import the mongoose library
import mongoose from "mongoose";

// Get the current date and parse it into a number
const date = Date.parse(new Date().toLocaleDateString());


const { Schema } = mongoose;

// Create a new mongoose schema for the "notification" collection

const notificationSchema = new mongoose.Schema({
    expenseId: {
		type: Schema.Types.ObjectId, // Expense ID associated with the notification
		required: true, // This field is required
		ref: "expense", // Reference to the "expense" collection
		unique: true, // This field should be unique
	},
    date: { type: Date, default: date},  // Date of the notification (defaults to the current date)

})
// Export a mongoose model for the "notification" collection
export const Notification = mongoose.model('notification', notificationSchema);

// Export an object with the Notification model as its property
export default {Notification};