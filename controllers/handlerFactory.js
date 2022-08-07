const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: doc
    });
  });

exports.getAll = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET links of departement (hack)
    let filter = {};
    if (req.params.linkId) filter = { link: req.params.linkId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    if (populateOptions) features.query = features.query.populate(populateOptions);

    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc
    });
  });

exports.bulkUpdate = Model =>
  catchAsync(async (req, res, next) => {
    const queries = [];

    for (let i = 0; i < req.body.length; i++) {
      const row = { ...req.body[i] };
      delete row.id;

      queries.push(
        Model.findByIdAndUpdate(req.body[i].id, row, {
          new: true,
          runValidators: true
        })
      );
    }
    const docs = await Promise.all(queries);

    res.status(200).json({
      status: 'success',
      data: docs
    });
  });

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.deleteMany = Model =>
  catchAsync(async (req, res, next) => {
    const docs = await Model.deleteMany();
    if (!docs) {
      return next(new AppError('No documents found, Nothing to Delete', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });
