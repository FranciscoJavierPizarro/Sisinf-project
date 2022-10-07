import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  descp: {
    type: String,
  },
  publisherId: {
    type: String,
  },
  publishingDate: {
    type: Date,
  },
  cityId: {
    type: String,
  },
  favs: {
    type: Number,
  },
});

export default mongoose.models.Place || mongoose.model('Place', PlaceSchema);