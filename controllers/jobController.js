import { nanoid } from "nanoid";
import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import { JOB_STATUS } from "../utils/constants.js";
import mongoose from "mongoose";
import day from "dayjs";
// get all jobs
export const getAlljobs = async (req, res) => {
  // console.log(req.query);
  const { search, jobStatus, jobType, sort } = req.query;
  const queryObject = { createdBy: req.user.userId };
  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }
  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);
  const totalJobs = await Job.countDocuments(queryObject);
  const numberPages = Math.ceil(totalJobs / limit);
  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numberPages, curentPage: page, jobs });
};

// create job
export const createJobs = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// get single job
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

// update job
export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: "job modified", job: updatedJob });
};

// delete job

export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "job deleted", job: removedJob });
};

// job stats

export const showStats = async (req, res) => {
  try {
    let stats = await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
      { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
    ]);
    stats = stats.reduce((acc, curr) => {
      const { _id: title, count } = curr;
      acc[title] = count;
      return acc;
    }, {});
    const defaultStats = {
      pending: stats.pending || 0,
      interview: stats.interview || 0,
      declined: stats.declined || 0,
    };
    // let monthlyApplication = [
    //   { date: "May 23", count: 12 },
    //   { date: "Jun 23", count: 9 },
    //   { date: "Jul 23", count: 3 },
    // ];
    // let monthlyApplication = await Job.aggregate([
    //   { $match: { createdBy: new mongoose.Types.ObjectId(req.user.UserId) } },
    //   {
    //     $group: {
    //       _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
    //     },
    //   },
    // ]);
    let monthlyApplications = await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },

      {
        $addFields: { createdAt: { $toDate: "$createdAt" } }, // Convert to Date
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 },
    ]);
    console.log("monthlyApplications", monthlyApplications);
    monthlyApplications = monthlyApplications.map(({ _id, count }) => {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      return {
        date: `${months[_id.month - 1]} ${_id.year.toString().slice(-2)}`, // Formatting the date as "Month YY"
        count,
      };
    });

    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "error occurred" });
  }
};
