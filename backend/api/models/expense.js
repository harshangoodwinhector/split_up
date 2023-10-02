// Import the Mongoose library
import mongoose from "mongoose";

// Get the current date and time as a Date object, then convert it to a string and parse it as a Date object again to remove the time component
const date = Date.parse(new Date().toLocaleDateString());

// Define a new schema for expenses
const ExpenseSchema = new mongoose.Schema(
  {
    // The date of the expense, defaults to today's date and is required
    date: {
      type: Date,
      default: date,
      required: [true, "Date is required"],
    },
    // The subcategory of the expense, is required
    sub_category: {
      required : true,
      type: String,
    },
    // The category of the expense, is required
    category :{
      required : true,
      type : String
    },
    // The amount of the expense, is required
    amount: {
      type: Number,
      required: [true, " amt is required"],
    },
    // The currency of the expense, defaults to USD
    currency: {
      type: String,
      default: "USD",
    },
    // A description of the expense
    description: {
      type: String,
    },
    // A reference to the expense, defaults to "Added expense"
    reference:{
      type: String,
      default: "Added expense"
    },
    // A flag that indicates if the expense is recurring or not, defaults to false
    recurring_expense:{
      type: Boolean,
      default: false
    },
    // A reference to the user that added the expense, is required
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref : "User",
      required: true,
    }
  },
  // Add timestamps for when the document was created and last updated
  {
    timestamps: true,
  }
);

// Create a Mongoose model for expenses using the schema
export const expense = mongoose.model("expense", ExpenseSchema);

// Export the model as an object with a default property that holds the expense model
export default { expense };
