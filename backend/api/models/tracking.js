// Importing Mongoose library
import mongoose from "mongoose";

// Defining a Mongoose schema for Tracking model
const Trackingschema = new mongoose.Schema(
  {
    // Field for total expenses incurred by an individual user
    total_expense_Indvidual: {
      default: 0, // Default value is 0
      type: Number, // Field type is Number
    },

    // Field for total expenses incurred by a group of users
    total_group_expense: {
      default: 0, // Default value is 0
      type: Number, // Field type is Number
    },

    // Field for total income earned by the user(s)
    total_income: {
      default: 0, // Default value is 0
      type: Number, // Field type is Number
    },

    // Field for referencing the User model using the User's ObjectId
    user_id: {
      type: mongoose.SchemaTypes.ObjectId, // Field type is ObjectId
      ref: "User", // References the "User" model
      required: true, // Field is required
    },
  }
);

// Creating a Mongoose model for Tracking using the schema
export const tracking = mongoose.model("tracking", Trackingschema);

// Exporting the Tracking model as an object
export default { tracking };
