import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  order: { 
    type: Number, 
    required: true, 
    default: 0 
  } 
}, { 
  timestamps: true 
});

const Chapter = mongoose.model('Chapter', chapterSchema);
export default Chapter;