const express = require('express');
const typeController = require('../controllers/typeController');
const authController = require('../controllers/authController');
const customerRouter = require('./../routes/customerRoutes');

const router = express.Router();

// router.param('id', typeController.checkID);

// POST /type/:typeId/links
// GET /type/:typeId/links

router.use('/:typeId/links', customerRouter);

router
  .route('/')
  .get(typeController.getAllTypes)
  .post(authController.protect, authController.restrictTo('admin'), typeController.createType)
  .patch(authController.protect, authController.restrictTo('admin'), typeController.bulkUpdateType);

router
  .route('/:id')
  .get(typeController.getType)
  .patch(authController.protect, authController.restrictTo('admin'), typeController.updateType)
  .delete(authController.protect, authController.restrictTo('admin'), typeController.deleteType);

module.exports = router;
