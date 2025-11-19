import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  chapter: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Chapter',
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true 
  }, // URL
  content: { 
    type: String, 
    required: true 
  }, // Nội dung lý thuyết
  views: { 
    type: Number, 
    default: 0 
  }
}, { 
  timestamps: true 
});

const Lesson = mongoose.model('Lesson', lessonSchema);
export default Lesson;