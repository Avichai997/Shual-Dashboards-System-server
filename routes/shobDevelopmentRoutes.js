const express = require('express');
const shobDevelopmentController = require('../controllers/shobDevelopmentController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(shobDevelopmentController.getAllShobDevelopments)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    shobDevelopmentController.createShobDevelopment
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    shobDevelopmentController.bulkUpdateShobDevelopment
  );

router
  .route('/:id')
  .get(shobDevelopmentController.getShobDevelopment)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    shobDevelopmentController.updateShobDevelopment
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    shobDevelopmentController.deleteShobDevelopment
  );

module.exports = router;
