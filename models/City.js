import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  descp: {
    type: String,
  },
  mapsUrl: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
  publisherId: {
    type: String,
  },
  publishingDate: {
    type: Date,
  },
  Validacion: {
    type: Boolean,
  },
});
CitySchema.index({name: 'text', descp: 'text'});

export default mongoose.models.City || mongoose.model('City', CitySchema);