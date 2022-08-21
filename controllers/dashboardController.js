const Dashboard = require('../models/dashboardModel');
const factory = require('./handlerFactory');

exports.getAllDashboards = factory.getAll(Dashboard);
exports.getDashboard = factory.getOne(Dashboard);
exports.updateDashboard = factory.updateOne(Dashboard);
exports.deleteDashboard = factory.deleteOne(Dashboard);
exports.bulkUpdateDashboard = factory.bulkUpdate(Dashboard);
exports.createDashboard = factory.createOne(Dashboard);
