var slug = require('mongoose-slug-updater');
import mongoose from 'mongoose';

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Recipe = new Schema(
  {
    name: { type: String, default: '' },
    image: { type: String, default: '' },
    description: { type: String, default: '' },

    // the total time to make the dish
    totalTime: { type: String, default: '' },

    ingredients: {
      type: Array,
      default: [{ type: String, default: '' }],
    },
    steps: {
      type: Array,
      default: [{ type: String, default: '' }],
    },

    slug: { type: String, slug: 'name', unique: true },
  },
  {
    timestamps: true,
  },
);

Recipe.index({ name: 'slug' });

export default mongoose.model('Recipe', Recipe);
