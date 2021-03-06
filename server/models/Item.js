const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    name: String,
    description: String,
    image: {
      type: String,
      default:
        "https://cdn1.iconfinder.com/data/icons/gardening-filled-line/614/1935_-_Growing_Plant-512.png",
    },
    category: [
      {
        type: String,
        enum: ["Plant", "Kombucha", "Kefir", "Vinegar"],
      },
    ],
    quantity: Number,
    address: String,
    location: [Number],
    // location: {
    //   // type: "Point",
    //   coordinates: [Number],
    //   formattedAddress: String,
    // },
    id_user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    user_firstName: String,
    user_lastName: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
