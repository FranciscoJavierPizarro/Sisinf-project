import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
  placeId: {
    type: String,
  },
  userId: {
    type: String,
  }
});

export default mongoose.models.Like || mongoose.model('Like', LikeSchema);