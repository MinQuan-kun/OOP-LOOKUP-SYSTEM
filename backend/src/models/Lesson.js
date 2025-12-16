import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  chapter: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Chapter', 
    required: true 
  },
  knowledge_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'KnowledgeType',
    required: true
  },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, 
  content: { type: String, required: true }, 
}, { 
  timestamps: true 
});

const Lesson = mongoose.model('Lesson', lessonSchema);
export default Lesson;