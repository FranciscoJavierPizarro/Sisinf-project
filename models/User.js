import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
  },
  gmail: {
    type: String,
  },
  admin: {
    type: Boolean,
  },
  spam: {
    type: String,
  }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);