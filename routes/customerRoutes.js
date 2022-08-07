const express = require('express');
const customerController = require('../controllers/customerController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(customerController.getAllCustomers)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    customerController.createCustomer
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    customerController.bulkUpdateCustomer
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    customerController.deleteManyCustomers
  );

router
  .route('/:id')
  .get(customerController.getCustomer)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    customerController.updateCustomer
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    customerController.deleteCustomer
  );

module.exports = router;
