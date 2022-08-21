const mongoose = require('mongoose');
const validator = require('validator');

const checkIsURL = url => {
  return validator.isURL(url, {
    protocols: ['http', 'https'], // valid protocols can be modified with this option. default: ['http','https','ftp'].
    require_tld: true,
    require_protocol: false, // if set as true isURL will return false if protocol is not present in the URL.
    require_host: true, // if set as false isURL will not check if host is present in the URL.
    require_port: false, // if set as true isURL will check if port is present in the URL.
    require_valid_protocol: true, // isURL will check if the URL's protocol is present in the protocols option.
    allow_underscores: true,
    host_whitelist: false,
    host_blacklist: false,
    allow_trailing_dot: false,
    allow_protocol_relative_urls: false, // if set as true protocol relative URLs will be allowed.
    allow_fragments: true, // if set as false isURL will return false if fragments are present.
    allow_query_components: true, // if set as false isURL will return false if query components are present.
    disallow_auth: false,
    validate_length: true // if set as false isURL will skip string length validation (2083 characters is IE max URL length).
  });
};

const dashboardSchema = new mongoose.Schema(
  {
    order: {
      type: Number,
      required: [true, 'דשבורד חייב להכיל מספר סידורי']
    },
    name: {
      type: String,
      required: [true, 'דשבורד חייב להכיל שם'],
      trim: true,
      maxlength: [40, 'שם הדשבורד צריך להיות קצר מ-40 תווים'],
      minlength: [2, 'שם הדשבורד צריך להיות ארוך מ-2 תווים']
    },
    url: {
      type: String,
      required: [true, 'דשבורד חייב להכיל מספר סידורי'],
      validate: {
        validator: checkIsURL,
        message: 'נא הזן URL תקין לדוגמה: www.example.com'
      }
    },
    includeShualCityId: {
      type: [Number],
      default: null
    },
    excludeShualCityId: {
      type: [Number],
      default: null
    },
    customerTypeId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Type', // link documents to this model name
      required: [true, 'לקוח חייב להיות מקושר לסוג לקוח']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;
