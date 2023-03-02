const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please enter a company name"],
      maxLength: 50,
    },

    position: {
      type: String,
      required: [true, "Please enter a position"],
      maxLength: 100,
    },

    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      // ^^^ creates a validator that checks if the value is in the given array.

      default: "pending",
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      // ^^^ An ObjectId is a special type typically used for unique identifiers. ObjectId is a class, and ObjectIds are objects. However, they are often represented as strings.

      ref: "User",
      // ^^^ Set the model that this path refers to.

      required: [true, "Please provide a user"],

      // ^^^ ****** THIS VALIDATOR IS FULFILLED IN THE  JOB CONTROLLER ****
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
