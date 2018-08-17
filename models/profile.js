const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  movielist: [
    {
      title: {
        type: String
      },
      year: {
        type: String
      },
      genre: {
        type: String
      },
      rated: {
        type: String
      },
      plot: {
        type: String
      },
      poster: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  watchedlist: [
    {
      title: {
        type: String
      },
      year: {
        type: String
      },
      genre: {
        type: String
      },
      rated: {
        type: String
      },
      plot: {
        type: String
      },
      poster: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model("Profile", ProfileSchema);
