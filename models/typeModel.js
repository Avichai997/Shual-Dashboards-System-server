const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'סוג לקוח חייב להכיל שם'],
      unique: true,
      trim: true,
      maxlength: [40, 'שם סוג הלקוח חייב להיות באורך של 40 תווים לכל היותר'],
      minlength: [3, 'שם סוג הלקוח חייב להיות באורך של 3 תווים לפחות']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// virtual populate links in type
typeSchema.virtual('customers', {
  ref: 'Customer',
  foreignField: 'typeId',
  localField: '_id'
});

const Type = mongoose.model('Type', typeSchema);

module.exports = Type;
