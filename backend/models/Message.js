import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  contact: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  }

},
{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;