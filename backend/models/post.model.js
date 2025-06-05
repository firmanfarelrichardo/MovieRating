import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text:{
    type: String,
  },
  img:{
    type: String,
  },
  // Tambahan field untuk data film
  movieTitle: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  synopsis: {
    type: String,
    required: true
  },
  likes:[
   {  
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
],
  comments:[
    {
    text:{
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  },
],
  avgRating: {
    type: Number,
    default: 0
  },
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      value: {
        type: Number,
        min: 1,
        max: 5,
        required: true
      }
    }
  ],
},
{timestamps: true})

const Post = mongoose.model("Post",postSchema)

export default Post