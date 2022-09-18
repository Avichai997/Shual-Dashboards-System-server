const Customer = require('../models/customerModel');
const factory = require('./handlerFactory');

exports.setCustomerUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.customer) req.body.customer = req.params.customerTypeId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllCustomers = factory.getAll(Customer);
exports.getCustomer = factory.getOne(Customer);
exports.createCustomer = factory.createOne(Customer);
exports.updateCustomer = factory.updateOne(Customer);
exports.bulkUpdateCustomer = factory.bulkUpdate(Customer);
exports.deleteCustomer = factory.deleteOne(Customer);
exports.deleteManyCustomers = factory.deleteMany(Customer);
