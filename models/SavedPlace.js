import mongoose from 'mongoose';

const SavedPlaceSchema = new mongoose.Schema({
  placeId: {
    type: String,
  },
  userId: {
    type: String,
  }
});

export default mongoose.models.SavedPlace || mongoose.model('SavedPlace', SavedPlaceSchema);