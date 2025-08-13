import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  coverLetter: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Application', applicationSchema);