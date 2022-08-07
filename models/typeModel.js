const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A type must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A type name must have less or equal then 40 characters'],
      minlength: [3, 'A type name must have more or equal then 3 characters']
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
