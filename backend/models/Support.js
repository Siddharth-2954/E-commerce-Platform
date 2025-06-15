const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema({
  userId: {               // Reference to the user submitting the support query
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subject: {              // Short summary of the issue
    type: String,
    required: true,
  },
  message: {              // Detailed description of the issue
    type: String,
    required: true,
  },
  status: {               // Status of the support query (e.g. open, in-progress, closed)
    type: String,
    enum: ["open", "in-progress", "closed"],
    default: "open",
  },
  createdAt: {            // Timestamp when the query was created
    type: Date,
    default: Date.now,
  },
  updatedAt: {            // Timestamp when the query was last updated
    type: Date,
    default: Date.now,
  }
});

// Optional: Automatically update updatedAt before save
supportSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Support", supportSchema);
