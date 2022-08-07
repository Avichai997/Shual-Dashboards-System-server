const ShobDevelopment = require('../models/shobDevelopmentModel');
const factory = require('./handlerFactory');

exports.getAllShobDevelopments = factory.getAll(ShobDevelopment);
exports.getShobDevelopment = factory.getOne(ShobDevelopment);
exports.updateShobDevelopment = factory.updateOne(ShobDevelopment);
exports.deleteShobDevelopment = factory.deleteOne(ShobDevelopment);
exports.bulkUpdateShobDevelopment = factory.bulkUpdate(ShobDevelopment);
exports.createShobDevelopment = factory.createOne(ShobDevelopment);
