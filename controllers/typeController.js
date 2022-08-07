const Type = require('../models/typeModel');
const factory = require('./handlerFactory');

const typePopulateOptions = {
  path: 'customers',
  select: '-__v'
};

exports.getAllTypes = factory.getAll(Type, typePopulateOptions);
exports.getType = factory.getOne(Type, typePopulateOptions);
exports.createType = factory.createOne(Type);
exports.updateType = factory.updateOne(Type);
exports.bulkUpdateType = factory.bulkUpdate(Type);
exports.deleteType = factory.deleteOne(Type);
