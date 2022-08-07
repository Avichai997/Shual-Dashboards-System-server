const mongoose = require('mongoose');
const validator = require('validator');

const shobDevelopmentSchema = new mongoose.Schema(
  {
    order: {
      type: Number,
      required: [true, 'פיתוח שו"ב חייב להכיל מספר מיקום'],
      unique: true,
      min: [1, 'מספר מיקום צריך להיות גדול מ-1']
    },
    title: {
      type: String,
      required: [true, 'פיתוח שו"ב חייב להכיל כותרת'],
      trim: true,
      maxlength: [40, 'הכותרת צריכה להיות באורך מקסימאלי של 40 תווים'],
      minlength: [3, 'הכותרת צריכה להיות באורך מינימאלי של 3 תווים']
    },
    subTitle: {
      type: String,
      required: [true, 'פיתוח שו"ב חייב להכיל כותרת משנית'],
      trim: true,
      maxlength: [100, 'הכותרת המשנית צריכה להיות באורך מקסימאלי של 100s תווים'],
      minlength: [3, 'הכותרת המשנית צריכה להיות באורך מינימאלי של 3 תווים']
    },
    description: {
      type: String,
      required: [true, 'פיתוח שו"ב חייב להכיל תיאור'],
      trim: true,
      maxlength: [200, 'תיאור פיתוח שו"ב צריך להיות באורך מקסימאלי של 200 תווים'],
      minlength: [3, 'תיאור פיתוח שו"ב צריך להיות באורך מינימאלי של 3 תווים']
    },
    image: {
      type: String,
      trim: true,
      default: 'shobDefaultPic.jpg'
    },
    url: {
      type: String,
      required: [true, 'פיתוח שו"ב חייב להכיל URL'],
      trim: true,
      maxlength: [200, 'URL פיתוח שו"ב צריך להיות באורך מקסימאלי של 200 תווים'],
      minlength: [3, 'URL פיתוח שו"ב צריך להיות באורך מקסימאלי של 3 תווים'],
      validate: [validator.isURL, 'הקישור שהוזן לא תקין']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const ShobDevelopment = mongoose.model('ShobDevelopment', shobDevelopmentSchema);

module.exports = ShobDevelopment;
