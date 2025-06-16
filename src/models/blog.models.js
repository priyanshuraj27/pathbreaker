import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    tags: [
      {
        type: String,
      }
    ],
    category: {
      type: String,
      default: 'Uncategorized',
    },
    published: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    scheduledPublishDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Text index for search functionality
BlogSchema.index({ title: 'text', summary: 'text', content: 'text', tags: 'text' });

// Auto-generate slug before saving
BlogSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  next();
});

const Blog = models.Blog || model('Blog', BlogSchema);

export default Blog;
