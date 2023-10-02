import mongoose from "mongoose";

// gets the current date as a string and converts it to a Date object
const date = Date.parse(new Date().toLocaleDateString());

// defines the schema for group expenses
const groupExpenseSchema = new mongoose.Schema(
  {
    // date of the expense
    date: {
      type: Date,
      default: date, // sets the default value to the current date
      required: [true, "Date is required"], // specifies that this field is required
    },
    // sub category of the expense
    sub_category: {
      required: true, // specifies that this field is required
      type: String,
    },
    // category of the expense
    category: {
      type: String,
    },
    // amount of the expense
    amount: {
      type: Number,
      required: [true, "Amount is required"], // specifies that this field is required
    },
    // currency of the expense
    currency: {
      type: String,
      default: "USD", // sets the default value to USD
    },
    // description of the expense
    description: {
      type: String,
    },
    // shared amount of the expense
    shared_amount: {
      type: Number,
      default: 0, // sets the default value to 0
    },
    // specifies if the expense is recurring or not
    recurring_expense: {
      type: Boolean,
      default: false, // sets the default value to false
    },
    // reference of the expense
    reference: {
      type: String,
      default: "reference not added", // sets the default value to "reference not added"
    },
    // user who paid for the expense
    paidby: {
      type: mongoose.SchemaTypes.ObjectId, // specifies that this field is of type ObjectId
    },
    /* Association with User Schema */
    // ID of the flat for which the expense was made
    flat_id: {
      type: mongoose.SchemaTypes.ObjectId, // specifies that this field is of type ObjectId
      required: true, // specifies that this field is required
    },
    // IDs of the users who were involved in the expense
    user_id: [
      {
        type: mongoose.SchemaTypes.ObjectId, // specifies that this field is of type ObjectId
        required: true, // specifies that this field is required
        immutable: true, // specifies that this field cannot be updated
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields to the document
  }
);

// creates the group_expense model from the groupExpenseSchema
export const group_expense = mongoose.model("groupExpense", groupExpenseSchema);

// exports an object containing the group_expense model
export default { group_expense };
