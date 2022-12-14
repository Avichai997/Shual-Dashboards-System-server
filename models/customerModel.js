const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    customerTypeId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Type',
      required: [true, 'לקוח חייב להיות מקושר לסוג לקוח']
    },
    shualCityId: {
      type: Number,
      required: [true, 'לקוח חייב להכיל קוד רשות של מערכת שוע"ל']
    },
    lamas: {
      type: Number
    },
    name: {
      type: String,
      required: [true, 'לקוח חייב להכיל שם'],
      trim: true,
      maxlength: [40, 'שם לקוח צריך להיות קצר מ-40 תווים'],
      minlength: [2, 'שם לקוח צריך להיות ארוך מ-2 תווים']
    },
    isTraining: {
      type: Boolean,
      default: false
    },
    isEnabled: {
      type: Boolean,
      default: true
    },
    logo: {
      type: String,
      default: 'defaultCustomerLogo.jpg'
    },
    location: {
      type: {
        type: String,
        enum: ['Point'], // 'location.type' must be 'Point'
        default: 'Point'
      },
      coordinates: [Number] // [longtitude (Y)), latitude (X)]
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// customerSchema.index({ order: 1, departmentId: 1 }, { unique: true });

// customerSchema.pre(/^find/, function(next) {
//   this.populate({ path: 'departmentId', select: 'name' });
//   next();
// });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
