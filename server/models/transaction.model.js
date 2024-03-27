import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel", //reference to the UserModel
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["Credit", "Debit", "Card", "Cash"],
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["saving", "expense", "investment"],
  },
  amount: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    default: "Unknown",
  },
  date: {
    type: Date,
    required: true,
    // default: Date.now,
  },
});

const TransactionModel = mongoose.model("Transaction", transactionSchema);
export default TransactionModel;
