const mongodb = require("mongoose");
const userSchema = mongodb.Schema({
  _id: mongodb.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
});

module.exports = mongodb.model("User", userSchema);
