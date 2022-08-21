const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(dashboardController.getAllDashboards)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    dashboardController.createDashboard
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    dashboardController.bulkUpdateDashboard
  );

router
  .route('/:id')
  .get(dashboardController.getDashboard)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    dashboardController.updateDashboard
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    dashboardController.deleteDashboard
  );

module.exports = router;
