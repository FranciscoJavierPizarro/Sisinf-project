import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  placeId: {
    type: String,
  },
  userId: {
    type: String,
  },
  userName: {
    type: String,
  },
  content: {
    type: String,
  },
  publishingDate: {
    type: Date,
  },
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);