const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id }, // job id
  } = req;
  const job = await Job.findOne({ _id: id, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`No job with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId; // req.user was set in the authentication MW
  // ^^^ (.createdBy validator) fulfilled DYNAMICALLY
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id }, // job id
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company and Position fields must be specified");
  }

  const job = await Job.findOneAndUpdate(
    { _id: id, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  // ^^^ findOneAndUpdate(conditions, update-to, options)
  // ^^^ options used here: new --> if true, return the modified document rather than the original
  // ^^^ runValidators --> Update validators are off by default - you need to specify the runValidators option to make sure the updated job meets the requirements.

  if (!job) {
    throw new NotFoundError(`No job with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id }, // job id
  } = req;

  const job = await Job.findOneAndRemove({
    _id: id,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`No job with id ${id}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
