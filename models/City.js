import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  publisherId: {
    type: String,
  },
  publishingDate: {
    type: Date,
  },
});

export default mongoose.models.City || mongoose.model('City', CitySchema);